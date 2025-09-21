import React, { useState } from 'react';

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    background: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    borderBottom: '1px solid #e5e7eb',
    height: 51.2, // Reduced by 20%
  };

  const projectLogoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 'bold',
    fontSize: 14, // Slightly reduced
    color: '#111',
  };

  const searchStyle = {
    flex: 1,
    margin: '0 20px',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    background: '#f9fafb',
    fontSize: 13,
    outline: 'none',
    maxWidth: '300px',
  };

  const iconStyle = {
    cursor: 'pointer',
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  };

  const userInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 12,
  };

  const userNameStyle = {
    fontWeight: '500',
    fontSize: 13,
    color: '#111',
  };

  const userLocationStyle = {
    fontSize: 11,
    color: '#666',
  };

  const profileIconStyle = {
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: '#8E2DE2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 12,
    cursor: 'pointer',
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    background: '#fff',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 1000,
    minWidth: 200,
    padding: '12px',
  };

  const avatarStyle = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    marginRight: 8,
    backgroundColor: '#f5f7fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: 12,
  };

  const avatarListStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  return (
    <div style={headerStyle}>
      {/* Project Logo */}
     

      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="text" placeholder="Search for anything..." style={searchStyle} />
      </div>

      {/* Right Side Icons & User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
          <path d="M18 8a6 6 0 0 0-6-6H6a6 6 0 0 0-6 6v10h12V8z"></path>
          <path d="M13 12h-2v4h-2v-4H6v-2h2V6h2v4h2v2z"></path>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
          <path d="M18 8a6 6 0 0 0-6-6H6a6 6 0 0 0-6 6v10h12V8z"></path>
          <path d="M13 12h-2v4h-2v-4H6v-2h2V6h2v4h2v2z"></path>
        </svg>

        <div style={userInfoStyle}>
          <span style={userNameStyle}>Palak Jain</span>
          <span style={userLocationStyle}>Rajasthan, India</span>
        </div>

        <div
          style={profileIconStyle}
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          P
        </div>

        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div style={dropdownStyle}>
            <div style={avatarListStyle}>
              <div style={avatarStyle}>A</div>
              <div style={avatarStyle}>B</div>
              <div style={avatarStyle}>C</div>
              <div style={avatarStyle}>D</div>
              <div style={{ ...avatarStyle, backgroundColor: '#fbbf24', color: '#fff' }}>+2</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;