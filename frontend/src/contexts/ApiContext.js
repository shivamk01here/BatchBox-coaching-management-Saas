import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export const ApiProvider = ({ children }) => {
  // Institution Settings State
  const [institutionSettings, setInstitutionSettings] = useState({
    // Basic Info
    ob_name: 'excellence-coaching',
    domain: 'http://localhost:3000/coaching',
    ob_enable: true,
    institutionName: 'Excellence Coaching Institute',
    logo: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=200&fit=crop&crop=center',
    moto: 'Empowering Students to Achieve Excellence',
    description: 'Leading coaching institute with 10+ years of experience in competitive exam preparation. We provide comprehensive training for JEE, NEET, and other entrance exams with experienced faculty and proven results.',
    
    // Contact Information
    email: 'info@excellencecoaching.com',
    phone: '+91-9876543210',
    whatsapp: '+91-9876543210',
    alternatePhone: '+91-9876543211',
    
    // Address
    address: '123 Education Street, Knowledge Park',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    country: 'India',
    
    // Social Media
    website: 'https://excellencecoaching.com',
    facebook: 'https://facebook.com/excellencecoaching',
    instagram: 'https://instagram.com/excellencecoaching',
    youtube: 'https://youtube.com/excellencecoaching',
    linkedin: 'https://linkedin.com/company/excellencecoaching',
    
    // Branding
    primaryColor: '#7c3aed',
    secondaryColor: '#1f2937',
    domain: 'booking.excellencecoaching.com',
    
    // Business Hours
    businessHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '16:00', closed: false },
      sunday: { open: '10:00', close: '14:00', closed: false }
    },
    
    // Features & Amenities
    features: [
      'Expert Faculty',
      'Small Batch Size',
      'Regular Mock Tests',
      'Doubt Clearing Sessions',
      'Study Material Provided',
      'Online & Offline Classes',
      '24/7 Support',
      'Parent-Teacher Meetings'
    ],
    
    // Achievements
    achievements: [
      '500+ Students Placed',
      '95% Success Rate',
      '10+ Years Experience',
      'Top Ranking Institute'
    ],
    
    // Additional Settings
    allowOnlineBooking: true,
    requireAdvancePayment: true,
    advancePaymentPercentage: 20,
    cancellationPolicy: '48 hours advance notice required for cancellation',
    refundPolicy: 'Full refund available within 7 days of enrollment',
    termsAndConditions: 'By enrolling, you agree to our terms and conditions...',
    
    // SEO
    metaTitle: 'Excellence Coaching Institute - Best Coaching for Competitive Exams',
    metaDescription: 'Join Excellence Coaching Institute for comprehensive preparation of JEE, NEET, and other competitive exams. Expert faculty, proven results.',
    metaKeywords: 'coaching institute, JEE, NEET, competitive exams, Delhi coaching'
  });

  // Existing data (batches, students, packages, invoices)
  const [batches, setBatches] = useState([
    {
      id: 1,
      batchName: 'JEE Main & Advanced 2026',
      startDate: '2025-07-01',
      endDate: '2026-05-31',
      estimatedCapacity: 30,
      teacherName: 'Dr. Rahul Sharma',
      description: 'Complete JEE preparation with Physics, Chemistry, and Mathematics. Includes regular tests and doubt sessions.',
      enrolledStudents: [1, 2, 3],
      status: 'Active',
      fee: 85000,
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      schedule: 'Mon-Sat, 9:00 AM - 1:00 PM'
    },
    {
      id: 2,
      batchName: 'NEET 2026 Preparation',
      startDate: '2025-08-15',
      endDate: '2026-06-15',
      estimatedCapacity: 25,
      teacherName: 'Dr. Priya Patel',
      description: 'Comprehensive NEET preparation covering Biology, Chemistry, and Physics with medical entrance focus.',
      enrolledStudents: [2, 4, 5],
      status: 'Upcoming',
      fee: 75000,
      subjects: ['Biology', 'Chemistry', 'Physics'],
      schedule: 'Mon-Sat, 2:00 PM - 6:00 PM'
    },
    {
      id: 3,
      batchName: 'Foundation Course Class 11th',
      startDate: '2025-06-01',
      endDate: '2026-03-31',
      estimatedCapacity: 20,
      teacherName: 'Prof. Amit Kumar',
      description: 'Strong foundation building for Class 11th students preparing for competitive exams.',
      enrolledStudents: [1, 3, 6],
      status: 'Active',
      fee: 65000,
      subjects: ['PCM', 'PCB'],
      schedule: 'Mon-Fri, 4:00 PM - 7:00 PM'
    }
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'Arjun Singh', email: 'arjun@example.com', phone: '+91-9876543210', course: 'JEE Preparation', class: '12th' },
    { id: 2, name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91-9876543211', course: 'NEET Preparation', class: '12th' },
    { id: 3, name: 'Vikram Yadav', email: 'vikram@example.com', phone: '+91-9876543212', course: 'Foundation', class: '11th' },
    { id: 4, name: 'Anita Sharma', email: 'anita@example.com', phone: '+91-9876543213', course: 'NEET Preparation', class: '12th' },
    { id: 5, name: 'Ravi Verma', email: 'ravi@example.com', phone: '+91-9876543214', course: 'NEET Preparation', class: '12th' },
    { id: 6, name: 'Pooja Mehta', email: 'pooja@example.com', phone: '+91-9876543215', course: 'Foundation', class: '11th' }
  ]);

  const [packages, setPackages] = useState([
    { 
      id: 1, 
      name: 'Foundation Package', 
      price: 65000, 
      duration: '10 months', 
      features: ['Basic Concepts', 'Regular Tests', 'Study Material', 'Doubt Sessions'],
      description: 'Perfect for Class 11th students starting their journey'
    },
    { 
      id: 2, 
      name: 'Competitive Package', 
      price: 85000, 
      duration: '12 months', 
      features: ['Advanced Concepts', 'Mock Tests', 'Personal Mentoring', 'Crash Courses'],
      description: 'Comprehensive preparation for JEE/NEET'
    },
    { 
      id: 3, 
      name: 'Premium Package', 
      price: 120000, 
      duration: '15 months', 
      features: ['All Subjects', 'One-on-One Sessions', 'Guaranteed Results', 'Full Support'],
      description: 'Complete package with guaranteed success'
    }
  ]);

  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2025-001',
      studentName: 'Arjun Singh',
      issuedBy: 'Admin',
      date: '2025-06-10',
      status: 'Paid',
      totalAmount: 100800,
      paidAmount: 100800,
      packageName: 'Competitive Package',
      batchName: 'JEE Main & Advanced 2026',
      gst: 15800,
      baseAmount: 85000
    },
    {
      id: 'INV-2025-002',
      studentName: 'Sneha Gupta',
      issuedBy: 'Admin',
      date: '2025-06-12',
      status: 'Pending',
      totalAmount: 88500,
      paidAmount: 30000,
      packageName: 'Competitive Package',
      batchName: 'NEET 2026 Preparation',
      gst: 13500,
      baseAmount: 75000
    }
  ]);

  // API Functions
  const api = {
    // Institution Settings APIs
    getInstitutionSettings: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: institutionSettings, success: true }), 300);
      });
    },

    saveInstitutionSettings: async (settings) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          setInstitutionSettings(settings);
          resolve({ success: true, message: 'Settings saved successfully' });
        }, 500);
      });
    },

    // Existing APIs
    batchList: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: batches, success: true }), 500);
      });
    },

    batchDetails: async (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const batch = batches.find(b => b.id === parseInt(id));
          const enrolledStudentDetails = students.filter(s => batch?.enrolledStudents.includes(s.id));
          resolve({ 
            data: { ...batch, students: enrolledStudentDetails }, 
            success: true 
          });
        }, 500);
      });
    },

    batchSave: async (batchData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (batchData.id) {
            setBatches(prev => prev.map(b => b.id === batchData.id ? batchData : b));
          } else {
            const newBatch = { ...batchData, id: Date.now(), enrolledStudents: batchData.enrolledStudents || [] };
            setBatches(prev => [...prev, newBatch]);
          }
          resolve({ success: true, message: 'Batch saved successfully' });
        }, 500);
      });
    },

    studentsList: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: students, success: true }), 300);
      });
    },

    packagesList: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: packages, success: true }), 300);
      });
    },

    invoiceList: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ data: invoices, success: true }), 500);
      });
    },

    invoiceSave: async (invoiceData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newInvoice = {
            ...invoiceData,
            id: `INV-2025-${String(invoices.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            issuedBy: 'Admin'
          };
          setInvoices(prev => [...prev, newInvoice]);
          resolve({ success: true, data: newInvoice, message: 'Invoice created successfully' });
        }, 500);
      });
    }
  };

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};