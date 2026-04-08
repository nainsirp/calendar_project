import React, { useState, useEffect } from 'react';
import './CalendarComponent.css';

const NotesPanel = ({ currentMonth, currentYear }) => {
  const noteKey = `tasks-${currentYear}-${currentMonth}`;
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem(noteKey));
      if (Array.isArray(savedTasks)) {
        setTasks(savedTasks);
      } else {
        setTasks([]);
      }
    } catch (e) {
      setTasks([]);
    }
  }, [noteKey]);

  useEffect(() => {
    localStorage.setItem(noteKey, JSON.stringify(tasks));
  }, [tasks, noteKey]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setTasks([...tasks, { id: Date.now(), text: inputValue.trim(), done: false }]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <h3>Tasks & Notes</h3>
      </div>
      
      <div className="notes-list-container">
        {tasks.length === 0 ? (
          <p className="no-tasks-msg">No tasks yet. Add one below!</p>
        ) : (
          <ul className="notes-list">
            {tasks.map(task => (
              <li key={task.id} className={`note-item ${task.done ? 'completed' : ''}`}>
                <label className="note-label">
                  <input 
                    type="checkbox" 
                    checked={task.done} 
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="note-text">{task.text}</span>
                </label>
                <button className="note-delete-btn" onClick={() => deleteTask(task.id)} aria-label="Delete">
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form className="note-input-form" onSubmit={handleAddTask}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="note-input"
        />
        <button type="submit" className="note-add-btn">+</button>
      </form>
    </div>
  );
};

export default NotesPanel;
