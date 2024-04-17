import React, { useState } from 'react';

const Task = ({ task, onComplete, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: editedText }), // Assuming you only have a text field for the task
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // If the task was updated successfully, call the onUpdate callback
      onUpdate(task.id, editedText);
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error, show an alert, etc.
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // If the task was deleted successfully, call the onDelete callback
      onDelete(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error, show an alert, etc.
    }
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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
