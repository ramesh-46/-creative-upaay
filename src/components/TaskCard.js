import React from 'react';

const TaskCard = ({ task, index, column, onDragStart }) => {
  const cardStyle = {
    background: '#fff',
    padding: 10,
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: 10,
    cursor: 'grab',
  };
  const badgeColors = { Low: '#FFEB3B', High: '#F44336', Completed: '#4CAF50' };
  return (
    <div
      style={cardStyle}
      draggable
      onDragStart={(e) => onDragStart(e, column, index)}
    >
      <div style={{ fontWeight: 'bold', marginBottom: 5 }}>{task.title}</div>
      <div style={{ fontSize: 12, marginBottom: 5 }}>{task.description}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ padding: '2px 6px', background: badgeColors[task.priority], borderRadius: 4, fontSize: 10 }}>{task.priority}</span>
        <span style={{ fontSize: 10 }}>{task.comments}💬 {task.files}📎</span>
      </div>
    </div>
  );
};

export default TaskCard;
