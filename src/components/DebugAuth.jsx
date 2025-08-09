import React from 'react';

const DebugAuth = () => {
  const token = localStorage.getItem('authToken');
  
  const clearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#f0f0f0', 
      padding: '10px', 
      border: '1px solid #ccc',
      fontSize: '12px',
      maxWidth: '300px',
      wordBreak: 'break-all'
    }}>
      <h4>Debug Auth</h4>
      <p><strong>Token:</strong> {token ? token.substring(0, 50) + '...' : 'null'}</p>
      <p><strong>Token Length:</strong> {token ? token.length : 0}</p>
      <p><strong>Valid:</strong> {token && token !== 'undefined' && token !== 'null' ? 'Yes' : 'No'}</p>
      <button onClick={clearStorage} style={{ marginTop: '5px' }}>
        Clear Storage & Reload
      </button>
    </div>
  );
};

export default DebugAuth;
