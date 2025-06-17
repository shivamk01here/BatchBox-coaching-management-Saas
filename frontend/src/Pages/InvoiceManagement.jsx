// pages/InvoiceManagement.jsx
import React, { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import { Plus, Search, Download, Eye, Edit2, ArrowLeft, FileText, Calendar, User, DollarSign, Check, Clock, X } from 'lucide-react';

const InvoiceManagement = () => {
  const api = useApi();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [stats, setStats] = useState({
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0
  });

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const response = await api.invoiceList();
      setInvoices(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error loading invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (invoiceData) => {
    const totalAmount = invoiceData.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const paidAmount = invoiceData.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const unpaidAmount = totalAmount - paidAmount;
    
    setStats({ totalAmount, paidAmount, unpaidAmount });
  };

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetails(true);
  };

  const handleBackToList = () => {
    setShowDetails(false);
    setSelectedInvoice(null);
    loadInvoices();
  };

  if (showDetails && selectedInvoice) {
    return <InvoiceDetails invoice={selectedInvoice} onBack={handleBackToList} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
              <p className="text-gray-600 mt-1">Track and manage all your invoices</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
            >
              <Plus size={20} />
              Create Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                <p className="text-3xl font-bold text-green-600">₹{stats.paidAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unpaid Amount</p>
                <p className="text-3xl font-bold text-red-600">₹{stats.unpaidAmount.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Invoices</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleInvoiceClick(invoice)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                          <div className="text-sm text-gray-500">Issued by: {invoice.issuedBy}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{invoice.studentName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{invoice.totalAmount.toLocaleString()}</div>
                        {invoice.paidAmount < invoice.totalAmount && (
                          <div className="text-sm text-gray-500">₹{invoice.paidAmount.toLocaleString()} paid</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          invoice.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInvoiceClick(invoice);
                          }}
                          className="text-purple-600 hover:text-purple-900 mr-3"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle download
                          }}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <CreateInvoiceModal
          onClose={() => setShowCreateModal(false)}
          onSave={() => {
            setShowCreateModal(false);
            loadInvoices();
          }}
          api={api}
        />
      )}
    </div>
  );
};

// Create Invoice Modal Component
const CreateInvoiceModal = ({ onClose, onSave, api }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    packageId: '',
    batchId: '',
    baseAmount: 0,
    gstRate: 18,
    gstAmount: 0,
    totalAmount: 0,
    status: 'Pending',
    paidAmount: 0
  });
  const [students, setStudents] = useState([]);
  const [packages, setPackages] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [formData.baseAmount, formData.gstRate]);

  const loadData = async () => {
    try {
      const [studentsRes, packagesRes, batchesRes] = await Promise.all([
        api.studentsList(),
        api.packagesList(),
        api.batchList()
      ]);
      setStudents(studentsRes.data);
      setPackages(packagesRes.data);
      setBatches(batchesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const calculateTotals = () => {
    const gstAmount = Math.round((formData.baseAmount * formData.gstRate) / 100);
    const totalAmount = formData.baseAmount + gstAmount;
    setFormData(prev => ({ ...prev, gstAmount, totalAmount }));
  };

  const handlePackageSelect = (packageId) => {
    const selectedPackage = packages.find(p => p.id === parseInt(packageId));
    if (selectedPackage) {
      setFormData(prev => ({ 
        ...prev, 
        packageId, 
        baseAmount: selectedPackage.price 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const selectedStudent = students.find(s => s.id === parseInt(formData.studentId));
      const selectedPackage = packages.find(p => p.id === parseInt(formData.packageId));
      const selectedBatch = batches.find(b => b.id === parseInt(formData.batchId));

      const invoiceData = {
        ...formData,
        studentName: selectedStudent?.name,
        packageName: selectedPackage?.name,
        batchName: selectedBatch?.batchName,
        studentId: parseInt(formData.studentId),
        packageId: parseInt(formData.packageId),
        batchId: parseInt(formData.batchId)
      };

      await api.invoiceSave(invoiceData);
      onSave();
    } catch (error) {
      console.error('Error saving invoice:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Create Invoice</h2>
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
                Select Student *
              </label>
              <select
                required
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Choose a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.email}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Package *
              </label>
              <select
                required
                value={formData.packageId}
                onChange={(e) => handlePackageSelect(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Choose a package</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} - ₹{pkg.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Batch
              </label>
              <select
                value={formData.batchId}
                onChange={(e) => setFormData({...formData, batchId: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Choose a batch (optional)</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.batchName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Rate (%)
              </label>
              <input
                type="number"
                value={formData.gstRate}
                onChange={(e) => setFormData({...formData, gstRate: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Amount Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Amount Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Amount:</span>
                <span className="font-medium">₹{formData.baseAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST ({formData.gstRate}%):</span>
                <span className="font-medium">₹{formData.gstAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total Amount:</span>
                <span className="text-purple-600">₹{formData.totalAmount.toLocaleString()}</span>
              </div>
            </div>
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
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Invoice Details Component
const InvoiceDetails = ({ invoice, onBack }) => {
  const [editMode, setEditMode] = useState(false);

  const downloadPDF = () => {
    // Create a simple PDF-like view
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${invoice.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .invoice-details { margin-bottom: 30px; }
            .table { width: 100%; border-collapse: collapse; }
            .table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .table th { background-color: #f5f5f5; }
            .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>TechEd Institute</h1>
            <p>Professional Training & Education</p>
            <p>123 Education Street, Delhi, India</p>
            <p>Phone: +91-11-12345678 | Email: info@teched.com</p>
          </div>
          
          <div class="invoice-details">
            <h2>Invoice: ${invoice.id}</h2>
            <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
            <p><strong>Student:</strong> ${invoice.studentName}</p>
            <p><strong>Package:</strong> ${invoice.packageName}</p>
            ${invoice.batchName ? `<p><strong>Batch:</strong> ${invoice.batchName}</p>` : ''}
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${invoice.packageName}</td>
                <td>₹${invoice.baseAmount.toLocaleString()}</td>
              </tr>
              <tr>
                <td>GST (18%)</td>
                <td>₹${invoice.gst.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div class="total">
            <p>Total Amount: ₹${invoice.totalAmount.toLocaleString()}</p>
            <p>Paid Amount: ₹${invoice.paidAmount.toLocaleString()}</p>
            <p>Balance: ₹${(invoice.totalAmount - invoice.paidAmount).toLocaleString()}</p>
          </div>

          <div style="margin-top: 40px; text-align: center;">
            <p>Thank you for choosing TechEd Institute!</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Invoice {invoice.id}</h1>
                <p className="text-gray-600 mt-1">Invoice Details & Management</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={downloadPDF}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </button>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Edit2 size={18} />
                {editMode ? 'Cancel Edit' : 'Edit Invoice'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Invoice Details Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice ID:</span>
                  <span className="font-medium text-gray-900">{invoice.id}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600">Date:</span>
                 <span className="font-medium text-gray-900">{new Date(invoice.date).toLocaleDateString()}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600">Issued By:</span>
                 <span className="font-medium text-gray-900">{invoice.issuedBy}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600">Status:</span>
                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                   invoice.status === 'Paid' 
                     ? 'bg-green-100 text-green-800' 
                     : 'bg-red-100 text-red-800'
                 }`}>
                   {invoice.status}
                 </span>
               </div>
             </div>
           </div>

           <div>
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
             <div className="space-y-3">
               <div className="flex justify-between">
                 <span className="text-gray-600">Student Name:</span>
                 <span className="font-medium text-gray-900">{invoice.studentName}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600">Package:</span>
                 <span className="font-medium text-gray-900">{invoice.packageName}</span>
               </div>
               {invoice.batchName && (
                 <div className="flex justify-between">
                   <span className="text-gray-600">Batch:</span>
                   <span className="font-medium text-gray-900">{invoice.batchName}</span>
                 </div>
               )}
             </div>
           </div>
         </div>

         {/* Amount Breakdown */}
         <div className="border-t pt-8">
           <h3 className="text-lg font-semibold text-gray-900 mb-6">Amount Breakdown</h3>
           <div className="bg-gray-50 rounded-lg p-6">
             <div className="space-y-4">
               <div className="flex justify-between">
                 <span className="text-gray-600">Base Amount:</span>
                 <span className="font-medium">₹{invoice.baseAmount.toLocaleString()}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600">GST (18%):</span>
                 <span className="font-medium">₹{invoice.gst.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-lg font-bold border-t pt-4">
                 <span>Total Amount:</span>
                 <span className="text-purple-600">₹{invoice.totalAmount.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-green-600">
                 <span>Paid Amount:</span>
                 <span className="font-bold">₹{invoice.paidAmount.toLocaleString()}</span>
               </div>
               {invoice.paidAmount < invoice.totalAmount && (
                 <div className="flex justify-between text-red-600">
                   <span>Outstanding Balance:</span>
                   <span className="font-bold">₹{(invoice.totalAmount - invoice.paidAmount).toLocaleString()}</span>
                 </div>
               )}
             </div>
           </div>
         </div>
       </div>

       {/* PDF Preview */}
       <div className="bg-white rounded-xl shadow-md overflow-hidden">
         <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
           <h3 className="text-lg font-semibold text-gray-900">Invoice Preview</h3>
           <button
             onClick={downloadPDF}
             className="text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-2"
           >
             <Download size={18} />
             Download PDF
           </button>
         </div>

         <div className="p-8" style={{ minHeight: '600px' }}>
           {/* Invoice Header */}
           <div className="text-center mb-8 pb-6 border-b-2 border-purple-600">
             <h1 className="text-3xl font-bold text-purple-600 mb-2">TechEd Institute</h1>
             <p className="text-gray-600 text-lg">Professional Training & Education</p>
             <p className="text-gray-500 mt-2">123 Education Street, Delhi, India - 110001</p>
             <p className="text-gray-500">Phone: +91-11-12345678 | Email: info@teched.com</p>
           </div>

           {/* Invoice Info */}
           <div className="flex justify-between mb-8">
             <div>
               <h2 className="text-2xl font-bold text-gray-900 mb-4">INVOICE</h2>
               <div className="space-y-2">
                 <p><span className="font-semibold">Invoice Number:</span> {invoice.id}</p>
                 <p><span className="font-semibold">Date:</span> {new Date(invoice.date).toLocaleDateString()}</p>
                 <p><span className="font-semibold">Status:</span> 
                   <span className={`ml-2 px-2 py-1 rounded text-sm ${
                     invoice.status === 'Paid' 
                       ? 'bg-green-100 text-green-800' 
                       : 'bg-red-100 text-red-800'
                   }`}>
                     {invoice.status}
                   </span>
                 </p>
               </div>
             </div>
             
             <div className="text-right">
               <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
               <div className="space-y-1">
                 <p className="font-medium text-lg">{invoice.studentName}</p>
                 <p className="text-gray-600">Student</p>
               </div>
             </div>
           </div>

           {/* Invoice Table */}
           <div className="mb-8">
             <table className="w-full border-collapse border border-gray-300">
               <thead>
                 <tr className="bg-purple-50">
                   <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Description</th>
                   <th className="border border-gray-300 px-4 py-3 text-right font-semibold">Amount</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td className="border border-gray-300 px-4 py-3">
                     <div>
                       <p className="font-medium">{invoice.packageName}</p>
                       {invoice.batchName && <p className="text-sm text-gray-600">Batch: {invoice.batchName}</p>}
                     </div>
                   </td>
                   <td className="border border-gray-300 px-4 py-3 text-right">₹{invoice.baseAmount.toLocaleString()}</td>
                 </tr>
                 <tr>
                   <td className="border border-gray-300 px-4 py-3">GST (18%)</td>
                   <td className="border border-gray-300 px-4 py-3 text-right">₹{invoice.gst.toLocaleString()}</td>
                 </tr>
                 <tr className="bg-gray-50 font-semibold">
                   <td className="border border-gray-300 px-4 py-3">Total Amount</td>
                   <td className="border border-gray-300 px-4 py-3 text-right">₹{invoice.totalAmount.toLocaleString()}</td>
                 </tr>
                 <tr className="bg-green-50 text-green-800">
                   <td className="border border-gray-300 px-4 py-3">Paid Amount</td>
                   <td className="border border-gray-300 px-4 py-3 text-right">₹{invoice.paidAmount.toLocaleString()}</td>
                 </tr>
                 {invoice.paidAmount < invoice.totalAmount && (
                   <tr className="bg-red-50 text-red-800 font-semibold">
                     <td className="border border-gray-300 px-4 py-3">Outstanding Balance</td>
                     <td className="border border-gray-300 px-4 py-3 text-right">₹{(invoice.totalAmount - invoice.paidAmount).toLocaleString()}</td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>

           {/* Payment Terms */}
           <div className="mb-8">
             <h3 className="font-semibold text-gray-900 mb-3">Payment Terms & Conditions:</h3>
             <ul className="text-sm text-gray-600 space-y-1">
               <li>• Payment is due within 30 days of invoice date</li>
               <li>• Late payments may incur additional charges</li>
               <li>• All disputes must be reported within 7 days</li>
               <li>• Course fees are non-refundable after course commencement</li>
             </ul>
           </div>

           {/* Footer */}
           <div className="text-center border-t pt-6">
             <p className="text-purple-600 font-semibold text-lg mb-2">Thank you for choosing TechEd Institute!</p>
             <p className="text-gray-500 text-sm">For any queries, please contact us at accounts@teched.com</p>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default InvoiceManagement;