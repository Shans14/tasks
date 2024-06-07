import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/tasks/${id}`)
        .then(response => setTask(response.data))
        .catch(error => console.error('Error fetching task:', error));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
        navigate(`/task/${id}`);
      } else {
        await axios.post('http://localhost:5000/api/tasks', task);
        navigate('/'); // Redirect to the task list
      }
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={task.description} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
