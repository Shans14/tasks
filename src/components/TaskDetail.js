import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task:', error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return <div>Loading task...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <button onClick={deleteTask}>Delete Task</button>
    </div>
  );
};

export default TaskDetail;
