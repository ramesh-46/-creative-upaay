import React, { useState } from 'react';

const AddTaskModal = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Low');
  const [comments, setComments] = useState(0);
  const [files, setFiles] = useState(0);

  if (!show) return null;

  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center'
  };
  const modalStyle = { background: '#fff', padding: 20, borderRadius: 8, width: 300 };

  const handleSave = () => {
    onSave({ title, description: desc, priority, comments, files }, 'todo');
    setTitle(''); setDesc(''); setPriority('Low'); setComments(0); setFiles(0);
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Add Task</h3>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', marginBottom: 5, padding: 5 }} />
        <input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} style={{ width: '100%', marginBottom: 5, padding: 5 }} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', marginBottom: 5, padding: 5 }}>
          <option>Low</option><option>High</option><option>Completed</option>
        </select>
        <input type="number" placeholder="Comments" value={comments} onChange={(e) => setComments(e.target.value)} style={{ width: '100%', marginBottom: 5, padding: 5 }} />
        <input type="number" placeholder="Files" value={files} onChange={(e) => setFiles(e.target.value)} style={{ width: '100%', marginBottom: 5, padding: 5 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <button onClick={onClose} style={{ padding: 5 }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: 5, background: '#8E2DE2', color: '#fff', border: 'none', borderRadius: 4 }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
