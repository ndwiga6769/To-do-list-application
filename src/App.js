// src/App.js

import React, { useState } from 'react';
import AddTask from './AddTask';
import Task from './Task';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>My To-Do List</h1>
      <AddTask onAdd={handleAddTask} />
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      ))}
    </div>
  );
};

export default App;
