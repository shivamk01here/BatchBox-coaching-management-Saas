import React from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  BarChart3, 
  FileText,
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'students', icon: Users, label: 'Students' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'reports', icon: FileText, label: 'Reports' },
  ];

  const sidebarItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-12 bg-white border-r border-gray-100 flex flex-col items-center py-4 z-40 shadow-sm">
      {/* Logo - Clickable to go to homepage */}
      <div className="mb-6">
        <button
          onClick={() => setActiveTab('Homepage')}
          className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="text-white font-bold text-sm">B</span>
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col space-y-3 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 group relative ${
                isActive
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
              }`}
              title={item.label}
            >
              <Icon size={16} />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col space-y-3 mt-6">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300 group relative"
              title={item.label}
            >
              <Icon size={16} />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
              </div>
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 group relative"
          title="Logout"
        >
          <LogOut size={16} />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
            Logout
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;