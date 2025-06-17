import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import DashboardContent from './DashboardContent';
import ProfilePage from './ProfilePage';
<<<<<<< HEAD
import People from './People';
import Package from '../components/Sidebar/Package';
import Class from '../components/Sidebar/Class';
import BookingSetting from './BookingSetting';
import MoodPage from './MoodPage';
import FinancePage from './FinancePage';
import SettingsPage from './SettingsPage';
import ReportsPage from './ReportsPage';
import HelpPage from './HelpPage';
import BatchManagement from '../Pages/BatchManagement';
import InvoiceManagement from '../Pages/InvoiceManagement';
import { ApiProvider } from '../contexts/ApiContext';
=======
import Homepage from './Homepage';
import People from './People';
import Subject from '../components/Sidebar/Subject';
import Package from '../components/Sidebar/Package';
import Class from '../components/Sidebar/Class';
import BookingSetting from './BookingSetting';
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Homepage');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent user={user} />;
      case 'profile':
        return <ProfilePage user={user} />;
      case 'People':
          return <People />;
<<<<<<< HEAD
=======
      case 'Subject':
        return <Subject />;
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
      case 'Class':
        return <Class />;
      case 'item':
          return <Package />;
      case 'online Booking':
<<<<<<< HEAD
          return (
            <ApiProvider>
              <BookingSetting />
            </ApiProvider>
          );
      case 'analytics':
          return <MoodPage />
      case 'FinancePage':
        return <FinancePage />;
      case 'SettingsPage':
        return <SettingsPage />;
=======
          return <BookingSetting />;
      case 'analytics':
          return <div>analytics would be here soon</div>
      case 'users':
        return <div className="p-6 bg-white rounded-2xl shadow-lg"><h2 className="text-2xl font-bold text-gray-900">Users Management</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>;
      case 'courses':
        return <div className="p-6 bg-white rounded-2xl shadow-lg"><h2 className="text-2xl font-bold text-gray-900">Courses Management</h2><p className="text-gray-600 mt-2">Coming Soon</p></div>;
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
      case 'reports':
        return <ReportsPage />;
      case 'HelpPage':
        return <HelpPage />
      case 'BatchManagement':
        return (
          <ApiProvider>
            <BatchManagement />
          </ApiProvider>
        );
      case 'InvoiceManagement':
          return (
            <ApiProvider>
              <InvoiceManagement />
            </ApiProvider>
          );
      default:
        return  <DashboardContent user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Area - adjusted for sidebar width */}
        <div className="flex-1 ml-20 min-h-screen">
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