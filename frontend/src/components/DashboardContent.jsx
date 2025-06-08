import React from 'react';
import { Users, BookOpen, TrendingUp, Calendar, Activity, Target } from 'lucide-react';

const DashboardContent = ({ user }) => {
  // Sample data for staff view
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Active Courses',
      value: '45',
      change: '+3.2%',
      trend: 'up',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Performance Rate',
      value: '87.5%',
      change: '+5.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New student enrolled', time: '2 hours ago', type: 'enrollment' },
    { id: 2, action: 'Course "Mathematics 101" updated', time: '4 hours ago', type: 'course' },
    { id: 3, action: 'Assignment submitted by John Doe', time: '6 hours ago', type: 'assignment' },
    { id: 4, action: 'New announcement posted', time: '1 day ago', type: 'announcement' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Staff Meeting', date: 'Today, 2:00 PM', type: 'meeting' },
    { id: 2, title: 'Parent-Teacher Conference', date: 'Tomorrow, 10:00 AM', type: 'conference' },
    { id: 3, title: 'Monthly Assessment', date: 'Jun 15, 2025', type: 'assessment' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-purple-100 text-lg">
              {user?.institution?.name} • {user?.role?.name}
            </p>
            <p className="text-purple-200 text-sm mt-1">
              Here's what's happening at your institution today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Activity size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon size={24} className={stat.textColor} />
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                }`}>
                  {stat.change}
                </span>
              </div>
              
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`bg-gradient-to-r ${stat.color} h-2 rounded-full`} style={{width: '75%'}}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
            <Activity size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors duration-300">
            View all activities →
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <Calendar size={20} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-300">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar size={14} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm font-medium">{event.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors duration-300">
            View calendar →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;