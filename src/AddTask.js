import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await fetch('http://127.0.0.1:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: text }), // Assuming you only have a title field for the task
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      // If the task was added successfully, call the onAdd callback
      onAdd(text);
      setText('');
    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error, show an alert, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
