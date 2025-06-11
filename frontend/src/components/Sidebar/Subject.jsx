
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', status: 'active' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const res = await axios.get('/api/subjects');
    if (res.data.success) setSubjects(res.data.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/subjects', form);
      if (res.data.success) {
        setIsOpen(false);
        setForm({ name: '', status: 'active' });
        fetchSubjects();
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subjects</h1>
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add Subject</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {subjects.length === 0 ? (
          <p>No subjects available.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left py-2">ID</th>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id} className="border-t">
                  <td>{subject.id}</td>
                  <td>{subject.name}</td>
                  <td>{subject.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4">Add New Subject</Dialog.Title>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Subject Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1">
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  {loading ? 'Adding...' : 'Add Subject'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default SubjectsPage;
