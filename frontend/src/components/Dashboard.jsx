import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardContent from './DashboardContent';
import ProfilePage from './ProfilePage';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent user={user} />;
      case 'profile':
        return <ProfilePage user={user} />;
      case 'users':
        return <div className="p-6">Users Management - Coming Soon</div>;
      case 'courses':
        return <div className="p-6">Courses Management - Coming Soon</div>;
      case 'reports':
        return <div className="p-6">Reports - Coming Soon</div>;
      case 'settings':
        return <div className="p-6">Settings - Coming Soon</div>;
      default:
        return <DashboardContent user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Area */}
        <div className="flex-1 ml-20">
          {/* Navbar */}
          <Navbar user={user} setActiveTab={setActiveTab} />
          
          {/* Content */}
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;