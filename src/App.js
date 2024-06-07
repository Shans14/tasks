import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/Taskform';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskDetail />} />
        <Route path="/new" element={<TaskForm />} />
        <Route path="/edit/:id" element={<TaskForm />} />
      </Routes>
    </Router>
  );
};

export default App;
