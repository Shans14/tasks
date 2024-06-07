// src/components/TaskDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => console.error('Error fetching task:', error));
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <Link to={`/edit/${task._id}`}>Edit</Link>
      <button onClick={() => axios.delete(`http://localhost:5000/api/tasks/${task._id}`).then(() => window.location.href = '/')}>Delete</button>
    </div>
  );
};

export default TaskDetail;
