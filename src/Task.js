// src/Task.js

import React, { useState } from 'react';

const Task = ({ task, onComplete, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save changes to the task
    // For simplicity, we'll just update the task text in this example
    task.text = editedText;
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }} onClick={handleEdit}>
          {task.text}
        </span>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
