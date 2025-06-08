import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Education Management System</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-section">
          <div className="welcome-card">
            <h2>Welcome, {currentUser?.name}!</h2>
            <p className="welcome-subtitle">
              {currentUser?.role?.name} at {currentUser?.institution?.name}
            </p>
            
            <div className="user-details">
              <div className="detail-item">
                <span className="label">Institution:</span>
                <span className="value">{currentUser?.institution?.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Role:</span>
                <span className="value">{currentUser?.role?.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{currentUser?.email}</span>
              </div>
              {currentUser?.staffID && (
                <div className="detail-item">
                  <span className="label">Staff ID:</span>
                  <span className="value">{currentUser?.staffID}</span>
                </div>
              )}
              {currentUser?.studentID && (
                <div className="detail-item">
                  <span className="label">Student ID:</span>
                  <span className="value">{currentUser?.studentID}</span>
                </div>
              )}
            </div>

            <div className="institution-info">
              <h3>Institution Information</h3>
              <div className="detail-item">
                <span className="label">Type:</span>
                <span className="value">{currentUser?.institution?.type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{currentUser?.institution?.email}</span>
              </div>
              <div className="detail-item">
                <span className="label">Phone:</span>
                <span className="value">{currentUser?.institution?.phone}</span>
              </div>
              <div className="detail-item">
                <span className="label">Address:</span>
                <span className="value">{currentUser?.institution?.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h3>Coming Soon</h3>
          <p>More features will be added gradually to enhance your experience.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;