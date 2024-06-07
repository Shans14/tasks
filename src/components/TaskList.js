import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
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

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/new">Add Task</Link>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <Link to={`/task/${task._id}`}>{task.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
