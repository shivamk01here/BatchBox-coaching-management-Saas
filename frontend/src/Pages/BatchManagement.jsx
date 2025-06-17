// pages/BatchManagement.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import { Search, Plus, X, Calendar, Users, User, FileText, ChevronRight, ArrowLeft, Edit2, Save } from 'lucide-react';

const BatchManagement = () => {
  const api = useApi();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      const response = await api.batchList();
      setBatches(response.data);
    } catch (error) {
      console.error('Error loading batches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchClick = async (batchId) => {
    try {
      const response = await api.batchDetails(batchId);
      setSelectedBatch(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error('Error loading batch details:', error);
    }
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedBatch(null);
    setEditMode(false);
    loadBatches();
  };

  if (showDetails && selectedBatch) {
    return <BatchDetails 
      batch={selectedBatch} 
      onBack={handleBackToList}
      editMode={editMode}
      setEditMode={setEditMode}
      api={api}
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Batch Management</h1>
              <p className="text-gray-600 mt-1">Manage your training batches efficiently</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
            >
              <Plus size={20} />
              Create Batch
            </button>
          </div>
        </div>
      </div>

      {/* Batch List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <div
                key={batch.id}
                onClick={() => handleBatchClick(batch.id)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-purple-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {batch.batchName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      batch.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : batch.status === 'Upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {batch.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <User size={16} />
                      <span className="text-sm">{batch.teacherName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">
                        {new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Users size={16} />
                      <span className="text-sm">
                        {batch.enrolledStudents?.length || 0}/{batch.estimatedCapacity} Students
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {batch.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${((batch.enrolledStudents?.length || 0) / batch.estimatedCapacity) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 ml-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Batch Modal */}
      {showCreateModal && (
        <CreateBatchModal
          onClose={() => setShowCreateModal(false)}
          onSave={() => {
            setShowCreateModal(false);
            loadBatches();
          }}
          api={api}
        />
      )}
    </div>
  );
};

// Create Batch Modal Component
const CreateBatchModal = ({ onClose, onSave, api }) => {
  const [formData, setFormData] = useState({
    batchName: '',
    startDate: '',
    endDate: '',
    estimatedCapacity: '',
    teacherName: '',
    description: '',
    enrolledStudents: []
  });
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await api.studentsList();
      setStudents(response.data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStudentToggle = (studentId) => {
    setFormData(prev => ({
      ...prev,
      enrolledStudents: prev.enrolledStudents.includes(studentId)
        ? prev.enrolledStudents.filter(id => id !== studentId)
        : [...prev.enrolledStudents, studentId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.batchSave(formData);
      onSave();
    } catch (error) {
      console.error('Error saving batch:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Create New Batch</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch Name *
              </label>
              <input
                type="text"
                required
                value={formData.batchName}
                onChange={(e) => setFormData({...formData, batchName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter batch name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teacher Name *
              </label>
              <input
                type="text"
                required
                value={formData.teacherName}
                onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter teacher name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Capacity *
              </label>
              <input
                type="number"
                required
                value={formData.estimatedCapacity}
                onChange={(e) => setFormData({...formData, estimatedCapacity: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter capacity"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter batch description"
            />
          </div>

          {/* Student Enrollment Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Enroll Students
            </label>
            
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Search students..."
                />
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center p-3 hover:bg-gray-50 border-b last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={formData.enrolledStudents.includes(student.id)}
                    onChange={() => handleStudentToggle(student.id)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>
              ))}
            </div>

            {formData.enrolledStudents.length > 0 && (
              <p className="text-sm text-purple-600 mt-2">
                {formData.enrolledStudents.length} student(s) selected
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
              Save Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Batch Details Component
const BatchDetails = ({ batch, onBack, editMode, setEditMode, api }) => {
  const [formData, setFormData] = useState(batch);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await api.studentsList();
      setStudents(response.data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.batchEditSave(formData);
      setEditMode(false);
      // Refresh data
      const response = await api.batchDetails(batch.id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error saving batch:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !formData.enrolledStudents?.includes(student.id)
  );

  const handleStudentAdd = (studentId) => {
    setFormData(prev => ({
      ...prev,
      enrolledStudents: [...(prev.enrolledStudents || []), studentId]
    }));
  };

  const handleStudentRemove = (studentId) => {
    setFormData(prev => ({
      ...prev,
      enrolledStudents: prev.enrolledStudents?.filter(id => id !== studentId) || []
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{formData.batchName}</h1>
                <p className="text-gray-600 mt-1">Batch Details & Management</p>
              </div>
            </div>
            <div className="flex gap-3">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                    <Save size={18} />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Edit2 size={18} />
                  Edit Batch
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Batch Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Batch Information</h2>
              
              {editMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Batch Name</label>
                    <input
                      type="text"
                      value={formData.batchName}
                      onChange={(e) => setFormData({...formData, batchName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teacher Name</label>
                    <input
                      type="text"
                      value={formData.teacherName}
                      onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Capacity</label>
                    <input
                      type="number"
                      value={formData.estimatedCapacity}
                      onChange={(e) => setFormData({...formData, estimatedCapacity: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Name</label>
                    <p className="text-gray-900 font-medium">{formData.teacherName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <p className="text-gray-900 font-medium">{formData.enrolledStudents?.length || 0}/{formData.estimatedCapacity} Students</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <p className="text-gray-900 font-medium">{new Date(formData.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <p className="text-gray-900 font-medium">{new Date(formData.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <p className="text-gray-900">{formData.description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Enrolled Students */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Enrolled Students</h2>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {formData.students?.length || 0} Students
                </span>
              </div>

              {formData.students && formData.students.length > 0 ? (
                <div className="space-y-3">
                  {formData.students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <p className="text-sm text-gray-500">{student.phone}</p>
                      </div>
                      {editMode && (
                        <button
                          onClick={() => handleStudentRemove(student.id)}
                          className="text-red-600 hover:text-red-800 transition-colors px-3 py-1 rounded-lg hover:bg-red-50"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No students enrolled yet</p>
              )}
            </div>
          </div>

          {/* Add Students Sidebar */}
          {editMode && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Students</h3>
                
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Search students..."
                    />
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                        <p className="text-xs text-gray-500 truncate">{student.email}</p>
                      </div>
                      <button
                        onClick={() => handleStudentAdd(student.id)}
                        className="text-purple-600 hover:text-purple-800 transition-colors text-sm px-2 py-1 rounded hover:bg-purple-50"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                  {filteredStudents.length === 0 && (
                    <p className="text-gray-500 text-center py-4 text-sm">No students found</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchManagement;