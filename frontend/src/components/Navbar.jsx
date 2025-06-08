import React from 'react';
import { User, Bell, Search } from 'lucide-react';

const Navbar = ({ user, setActiveTab }) => {
  return (
    <nav className="h-16 bg-white/90 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
      {/* Left side - Search */}
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm"
          />
        </div>
      </div>

      {/* Right side - User info and actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg">
            3
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 bg-gray-50/80 rounded-xl p-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role?.name}</p>
          </div>
          
          <button
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            title="Profile"
          >
            <User size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;