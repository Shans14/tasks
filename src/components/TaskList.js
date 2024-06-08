import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <Link to="/new">Add a new task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <Link to={`/task/${task._id}`}>{task.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
