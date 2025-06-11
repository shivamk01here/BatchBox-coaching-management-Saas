import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', duration: '', subject_ids: [] });
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [errorPackages, setErrorPackages] = useState(null);
  const [errorSubjects, setErrorSubjects] = useState(null); // Corrected declaration

  useEffect(() => {
    fetchPackages();
    fetchSubjects();
  }, []);

  // Fetches the list of packages
  const fetchPackages = async () => {
    setLoadingPackages(true);
    setErrorPackages(null);
    try {
      const res = await axios.get('/api/packages');
      // Package list API returns a direct array
      if (res.data && Array.isArray(res.data)) {
        setPackages(res.data);
      } else {
        console.error("API response for /api/packages was not a direct array:", res.data);
        setErrorPackages("Failed to load packages: Unexpected data format.");
        setPackages([]);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      setErrorPackages("Failed to load packages. Please check your network.");
      setPackages([]);
    } finally {
      setLoadingPackages(false);
    }
  };

  // Fetches the list of all available subjects
  const fetchSubjects = async () => {
    setLoadingSubjects(true);
    setErrorSubjects(null);
    try {
      const res = await axios.get('/api/subjects');
      // Subject list API returns { success: true, data: [...] }
      if (res.data && Array.isArray(res.data.data)) {
        setSubjects(res.data.data);
      } else {
        console.error("API response for /api/subjects was not an array in 'data' property:", res.data);
        setErrorSubjects("Failed to load subjects: Unexpected data format.");
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setErrorSubjects("Failed to load subjects. Please check your network.");
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  };

  // Handles clicking on a package to show its details
  const handlePackageClick = async (id) => {
    setModalData(null); // Clear previous modal data
    try {
      const res = await axios.get(`/api/packages/${id}`);
      // FIX HERE: Your package detail API returns { package: {}, subjects: [] } directly at the root
      if (res.data && res.data.package && Array.isArray(res.data.subjects)) {
        setModalData(res.data); // Directly set res.data as modalData
        setShowDetailModal(true); // Open the detail modal
      } else {
        console.error("Failed to load package details: Unexpected data format for package ID", id, res.data);
        alert("Could not load package details. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching package details:", error);
      alert("Error loading package details. Please try again.");
    }
  };

  // Handles changes in the add package form inputs
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const id = parseInt(value); // Convert value to integer for subject_ids
      setFormData(prev => ({
        ...prev,
        subject_ids: checked
          ? [...prev.subject_ids, id]
          : prev.subject_ids.filter(sid => sid !== id)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handles submitting the add package form
  const handleAddPackage = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/packages', formData);
      setShowAddModal(false);
      setFormData({ name: '', price: '', duration: '', subject_ids: [] }); // Reset form fields
      fetchPackages(); // Refresh the list of packages to show the new one
    } catch (error) {
      console.error("Error adding package:", error);
      alert("Failed to add package. Please check your input and try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">Packages Management</h2>
        <button
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          onClick={() => setShowAddModal(true)}
        >
          Add New Package
        </button>
      </div>

      {/* Display Packages */}
      {loadingPackages ? (
        <div className="text-center py-8 text-gray-600">Loading packages...</div>
      ) : errorPackages ? (
        <div className="text-center py-8 text-red-600 font-semibold">{errorPackages}</div>
      ) : packages.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No packages found. Click "Add New Package" to create one.</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map(pkg => (
            <li
              key={pkg.id}
              className="p-5 border border-gray-200 rounded-xl bg-gray-50 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-1"
              onClick={() => handlePackageClick(pkg.id)}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
              <p className="text-gray-700 text-sm mb-2">
                <span className="font-semibold">Price:</span> ₹{pkg.price} | <span className="font-semibold">Duration:</span> {pkg.duration} days
              </p>
              <p className={`text-xs font-semibold ${pkg.status ? 'text-green-600' : 'text-red-600'}`}>
                 Status: {pkg.status ? 'Active' : 'Inactive'}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* --- Package Detail Modal --- */}
      <Transition appear show={showDetailModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowDetailModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {modalData ? (
                    <>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4"
                      >
                        {modalData.package?.name || 'Package Details'}
                      </Dialog.Title>
                      <div className="mt-2 text-gray-700">
                        <p className="mb-1">
                          <span className="font-semibold">Price:</span> ₹{modalData.package?.price}
                        </p>
                        <p className="mb-3">
                          <span className="font-semibold">Duration:</span> {modalData.package?.duration} days
                        </p>
                        <h4 className="font-bold text-gray-800 mb-2">Included Subjects:</h4>
                        {Array.isArray(modalData.subjects) && modalData.subjects.length > 0 ? (
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {modalData.subjects.map(sub => (
                              <li key={sub.id} className="flex items-center">
                                <span className="font-medium">{sub.name}</span>
                                <span className={`ml-2 text-xs font-semibold ${sub.status ? 'text-green-600' : 'text-red-600'}`}>
                                  ({sub.status ? 'Active' : 'Inactive'})
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 text-sm">No subjects linked to this package.</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={() => setShowDetailModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500">Loading details...</div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* --- Add Package Modal --- */}
      <Transition appear show={showAddModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowAddModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 border-b pb-2 mb-4"
                  >
                    Add New Package
                  </Dialog.Title>
                  <form onSubmit={handleAddPackage} className="space-y-4 mt-2">
                    <div>
                      <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 mb-1">
                        Package Name
                      </label>
                      <input
                        id="packageName"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., Premium Study Pack"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="packagePrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹)
                      </label>
                      <input
                        id="packagePrice"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., 999"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="packageDuration" className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (days)
                      </label>
                      <input
                        id="packageDuration"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        placeholder="e.g., 30"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Subjects</label>
                      {loadingSubjects ? (
                        <div className="text-center text-gray-500">Loading subjects...</div>
                      ) : errorSubjects ? (
                        <div className="text-red-600 text-sm">{errorSubjects}</div>
                      ) : subjects.length === 0 ? (
                        <div className="text-gray-500 text-sm">No subjects available to select.</div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 p-3 rounded-md bg-gray-50">
                          {subjects.map(sub => (
                            // Only display active subjects for selection
                            sub.status === 1 && (
                                <label key={sub.id} className="flex items-center text-sm text-gray-800">
                                <input
                                    type="checkbox"
                                    value={sub.id}
                                    onChange={handleFormChange}
                                    checked={formData.subject_ids.includes(sub.id)}
                                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <span className="ml-2">{sub.name}</span>
                                </label>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setShowAddModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Add Package
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Package;