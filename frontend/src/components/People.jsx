// src/components/PeopleTab.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const PeopleTab = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', roleID: '' });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const navigate = useNavigate(); // Initialize useNavigate

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Error fetching users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/users', formData);
      setMessage('User created successfully!');
      setFormData({ name: '', email: '', mobile: '', roleID: '' });
      fetchUsers(); // Refresh the list of users
      setShowModal(false); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Error adding user. Please try again.');
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user-detail/${userId}`); // Navigate to the UserDetail component
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">People Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          + Add New Person
        </button>
      </div>

      {/* User List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">All Users</h3>
        {users.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No users found. Add a new user to get started!</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {users.map(user => (
              <li
                key={user.id}
                className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200 rounded-md"
                onClick={() => handleUserClick(user.id)}
              >
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">{user.name}</span>
                  <span className="text-gray-600 text-sm">{user.email}</span>
                </div>
                <div>
                  {user.is_verified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Not Verified
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md mx-auto relative transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Add New User</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="tel" // Use type="tel" for phone numbers
                  name="mobile"
                  id="mobile"
                  placeholder="9876543210"
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="roleID" className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="roleID"
                  id="roleID"
                  value={formData.roleID}
                  onChange={e => setFormData({ ...formData, roleID: e.target.value })}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Role</option>
                  <option value="2">Admin</option>
                  <option value="3">Teacher</option>
                  <option value="4">Student</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out font-semibold"
              >
                Add User
              </button>
            </form>
            {message && (
              <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleTab;