import React from 'react';

const Column = ({ title, count, tasks, columnId, onDragOver, onDrop, onDragStart }) => {
  return (
    <div
      style={{
        flex: 1,
        minWidth: '280px',
        background: '#fff',
        borderRadius: 10,
        padding: '12px',
        boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
        border: '1px solid #e5e7eb',
        margin: '0 8px',
        transition: 'all 0.2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
          {title} ({count})
        </h3>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#8E2DE2',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          +
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          minHeight: 80,
        }}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, columnId)}
      >
        {tasks.map((task, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => onDragStart(e, columnId, index)}
            style={{
              background: '#f9fafa',
              padding: '8px',
              borderRadius: 6,
              border: '1px solid #e5e7eb',
              fontSize: 12,
              cursor: 'grab',
              transition: 'all 0.1s ease',
              willChange: 'transform',
            }}
          >
            <div style={{ fontWeight: 500, marginBottom: 4 }}>{task.title}</div>
            <div style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>
              {task.description}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {task.priority === 'High' && (
                <span style={{ background: '#ef4444', color: '#fff', fontSize: 9, padding: '1px 4px', borderRadius: 3 }}>
                  H
                </span>
              )}
              {task.priority === 'Low' && (
                <span style={{ background: '#f59e0b', color: '#fff', fontSize: 9, padding: '1px 4px', borderRadius: 3 }}>
                  L
                </span>
              )}
              {task.status === 'Completed' && (
                <span style={{ background: '#10b981', color: '#fff', fontSize: 9, padding: '1px 4px', borderRadius: 3 }}>
                  C
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;