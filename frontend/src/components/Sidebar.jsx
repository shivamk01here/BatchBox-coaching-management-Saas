import React from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-20 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 shadow-2xl z-50 flex flex-col border-r border-slate-700">
      {/* Logo/Brand Area */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700/50">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">E</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-6 px-2">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full h-14 flex items-center justify-center group relative transition-all duration-300 rounded-xl ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform scale-105'
                      : 'hover:bg-slate-800/50 hover:scale-105'
                  }`}
                  title={item.label}
                >
                  <Icon 
                    size={22} 
                    className={`transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`} 
                  />
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-l-full"></div>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-700"></div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="w-full h-14 flex items-center justify-center group hover:bg-red-600/20 hover:border-red-500 border border-transparent transition-all duration-300 rounded-xl"
          title="Logout"
        >
          <LogOut 
            size={22} 
            className="text-slate-300 group-hover:text-red-400 transition-colors duration-300" 
          />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-slate-700">
            Logout
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-700"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;