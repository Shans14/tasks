import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleCompleted = async (id, completed) => {
    try {
      const updatedTask = await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(task => (task._id === id ? updatedTask.data : task)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/new">Add a new task</Link>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task._id, task.completed)}
            />
            <span className={task.completed ? 'completed' : ''}>
              <Link to={`/task/${task._id}`}>
                {task.title}
              </Link>
            </span>
            <i
              className="fas fa-trash-alt delete-icon"
              onClick={() => deleteTask(task._id)}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
