import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import AddTask from './components/AddTask';
import './App.css';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/new" element={<AddTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
