import React from 'react';

const Sidebar = ({ selectedProject, setSelectedProject }) => {
  const sidebarStyle = {
    width: 220, // Slightly reduced
    background: '#fff',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
    minHeight: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    fontFamily: 'Inter, sans-serif',
    overflowY: 'auto', // Enable vertical scroll if needed
    scrollbarWidth: 'thin',
    scrollbarColor: '#8E2DE2 transparent',
  };

  const navItem = (active) => ({
    padding: '12px 0',
    cursor: 'pointer',
    fontWeight: active ? 'bold' : 'normal',
    color: active ? '#8E2DE2' : '#111',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
  });

  const projectItem = (active) => ({
    padding: '8px 0',
    cursor: 'pointer',
    fontWeight: active ? 'bold' : 'normal',
    color: active ? '#8E2DE2' : '#666',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 13,
  });

  // Icons as SVG components
  const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

  const MessagesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );

  const TasksIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="18" y2="9"></line>
      <line x1="3" y1="15" x2="18" y2="15"></line>
    </svg>
  );

  const MembersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5.86A1 1 0 0 1 5 18.86V7.14A1 1 0 0 1 5.86 6H9"></path>
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
    </svg>
  );

  const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1.51H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-1.82-.33l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82.33l.06.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1.51h.09z"></path>
    </svg>
  );

  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  return (
    <div style={sidebarStyle}>
      {/* Project Title */}
      <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
        Project M.<span style={{ color: '#8E2DE2', marginLeft: 4 }}>•</span>
      </div>

      {/* Navigation Links */}
      <div style={navItem(true)}>
        <HomeIcon />
        Home
      </div>
      <div style={navItem(false)}>
        <MessagesIcon />
        Messages
      </div>
      <div style={navItem(false)}>
        <TasksIcon />
        Tasks
      </div>
      <div style={navItem(false)}>
        <MembersIcon />
        Members
      </div>
      <div style={navItem(false)}>
        <SettingsIcon />
        Settings
      </div>

      {/* Projects List */}
      <div style={{ marginTop: 24, fontWeight: 'bold', fontSize: 12, color: '#666' }}>MY PROJECTS</div>
      {['Mobile App', 'Website Redesign', 'Design System', 'Wireframes'].map((p) => (
        <div key={p} style={projectItem(selectedProject === p)} onClick={() => setSelectedProject(p)}>
          {selectedProject === p && <span style={{ color: '#8E2DE2', marginRight: 4 }}>*</span>}
          {p}
        </div>
      ))}

      {/* Thoughts Time Section - Smaller & Bottom */}
      <div style={{
        marginTop: 24,
        padding: 12,
        background: '#f5f7fa',
        borderRadius: 10,
        border: '1px solid #e5e7eb',
        textAlign: 'center',
        fontSize: 12,
      }}>
        <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" style={{ position: 'absolute', top: -8, right: 0 }}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 6 }}>Thoughts Time</div>
          <div style={{ fontSize: 11, color: '#666', lineHeight: 1.3, maxWidth: '90%' }}>
            We don't have any notice for you, till then you can share your thoughts with your peers.
          </div>
          <button
            style={{
              marginTop: 10,
              padding: '6px 12px',
              background: '#8E2DE2',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 500,
            }}
          >
            Write a message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;