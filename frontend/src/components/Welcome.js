import React from 'react';

const Welcome = ({ user, onLogout }) => {
  return (
    <div className="welcome-container">
      <h1>Welcome, {user.name}!</h1>
      <p>You have successfully logged into BatchBox.</p>
      <button onClick={onLogout} className="btn">
        Logout
      </button>
    </div>
  );
};

export default Welcome;