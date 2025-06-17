import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useApi } from '../contexts/ApiContext';

const BookingSettings = () => {
  const api = useApi();
  const [form, setForm] = useState({
    // Basic Info
    ob_name: '',
    ob_enable: false,
    institutionName: '',
    logo: '',
    moto: '',
    description: '',
    
    // Contact Information
    email: '',
    phone: '',
    whatsapp: '',
    alternatePhone: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    
    // Social Media
    website: '',
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    
    // Branding
    primaryColor: '#7c3aed',
    secondaryColor: '#1f2937',
    domain: '',
    
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
    features: [],
    achievements: [],
    
    // Additional Settings
    allowOnlineBooking: true,
    requireAdvancePayment: false,
    advancePaymentPercentage: 20,
    cancellationPolicy: '',
    refundPolicy: '',
    termsAndConditions: '',
    
    // SEO
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
=======

const BookingSettings = () => {
  const [form, setForm] = useState({
    ob_name: '',
    ob_enable: false,
    logo: '',
    moto: '',
    description: '',
    domain: ''
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState('basic');
=======
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f

  useEffect(() => {
    const fetchSettings = async () => {
      try {
<<<<<<< HEAD
        const response = await api.getInstitutionSettings();
        if (response.success) {
          setForm(response.data);
        }
=======
        const res = await fetch('/api/institution-setting', {
          credentials: 'include'
        });
        const data = await res.json();
        setForm(data || {});
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('Failed to fetch booking settings.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
<<<<<<< HEAD
  }, [api]);

  const save = async () => {
    try {
      const response = await api.saveInstitutionSettings(form);
      if (response.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
=======
  }, []);

  const save = async () => {
    try {
      await fetch('/api/institution-setting-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(form)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save settings.');
    }
  };

<<<<<<< HEAD
  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setForm(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setForm(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // const previewUrl = form.domain ? `https://${form.domain}` : `${window.location.origin}/${form.ob_name || ''}`;
     const previewUrl = 'http://localhost:3000/excellence' ;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading settings...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600">{error}</p>
    </div>
  );

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: '🏢' },
    { id: 'contact', name: 'Contact', icon: '📞' },
    { id: 'address', name: 'Address', icon: '📍' },
    { id: 'social', name: 'Social Media', icon: '🌐' },
    { id: 'branding', name: 'Branding', icon: '🎨' },
    { id: 'hours', name: 'Business Hours', icon: '🕒' },
    { id: 'features', name: 'Features', icon: '⭐' },
    { id: 'policies', name: 'Policies', icon: '📋' },
    { id: 'seo', name: 'SEO', icon: '🔍' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Booking Page Settings</h1>
            <p className="text-purple-100 mt-2">Configure your online booking page and institute information</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug (ob_name) *
                    </label>
                    <input
                      type="text"
                      value={form.ob_name}
                      onChange={(e) => handleInputChange('ob_name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="excellence-coaching"
                    />
                    <p className="text-sm text-gray-500 mt-1">This will be your booking page URL</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution Name *
                    </label>
                    <input
                      type="text"
                      value={form.institutionName}
                      onChange={(e) => handleInputChange('institutionName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Excellence Coaching Institute"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={form.logo}
                    onChange={(e) => handleInputChange('logo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/logo.png"
                  />
                  {form.logo && (
                    <div className="mt-3">
                      <img src={form.logo} alt="Logo Preview" className="h-16 w-16 object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motto/Tagline
                  </label>
                  <input
                    type="text"
                    value={form.moto}
                    onChange={(e) => handleInputChange('moto', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Empowering Students to Achieve Excellence"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your coaching institute..."
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="ob_enable"
                    checked={form.ob_enable}
                    onChange={(e) => handleInputChange('ob_enable', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="ob_enable" className="text-sm font-medium text-gray-700">
                    Enable Online Booking Page
                  </label>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="info@excellencecoaching.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+91-9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+91-9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alternate Phone
                    </label>
                    <input
                      type="tel"
                      value={form.alternatePhone}
                      onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+91-9876543211"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === 'address' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Address Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="123 Education Street, Knowledge Park"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Delhi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Delhi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      value={form.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="110001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="India"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Media & Website</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://excellencecoaching.com"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Facebook Page
                   </label>
                   <input
                     type="url"
                     value={form.facebook}
                     onChange={(e) => handleInputChange('facebook', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="https://facebook.com/excellencecoaching"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Instagram Profile
                   </label>
                   <input
                     type="url"
                     value={form.instagram}
                     onChange={(e) => handleInputChange('instagram', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="https://instagram.com/excellencecoaching"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     YouTube Channel
                   </label>
                   <input
                     type="url"
                     value={form.youtube}
                     onChange={(e) => handleInputChange('youtube', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="https://youtube.com/excellencecoaching"
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     LinkedIn Profile
                   </label>
                   <input
                     type="url"
                     value={form.linkedin}
                     onChange={(e) => handleInputChange('linkedin', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="https://linkedin.com/company/excellencecoaching"
                   />
                 </div>
               </div>
             </div>
           )}

           {/* Branding Tab */}
           {activeTab === 'branding' && (
             <div className="space-y-6">
               <h2 className="text-2xl font-bold text-gray-900 mb-6">Branding & Domain</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Primary Color
                   </label>
                   <div className="flex items-center space-x-3">
                     <input
                       type="color"
                       value={form.primaryColor}
                       onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                       className="h-12 w-20 border border-gray-300 rounded-lg cursor-pointer"
                     />
                     <input
                       type="text"
                       value={form.primaryColor}
                       onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                       className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                       placeholder="#7c3aed"
                     />
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Secondary Color
                   </label>
                   <div className="flex items-center space-x-3">
                     <input
                       type="color"
                       value={form.secondaryColor}
                       onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                       className="h-12 w-20 border border-gray-300 rounded-lg cursor-pointer"
                     />
                     <input
                       type="text"
                       value={form.secondaryColor}
                       onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                       className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                       placeholder="#1f2937"
                     />
                   </div>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   Custom Domain
                 </label>
                 <input
                   type="text"
                   value={form.domain}
                   onChange={(e) => handleInputChange('domain', e.target.value)}
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                   placeholder="booking.excellencecoaching.com"
                 />
                 <p className="text-sm text-gray-500 mt-1">Enter your custom domain (without https://)</p>
               </div>

               {/* Color Preview */}
               <div className="bg-gray-50 p-6 rounded-lg">
                 <h3 className="text-lg font-medium text-gray-900 mb-4">Color Preview</h3>
                 <div className="flex items-center space-x-4">
                   <div 
                     className="w-20 h-20 rounded-lg shadow-md flex items-center justify-center text-white font-bold"
                     style={{ backgroundColor: form.primaryColor }}
                   >
                     Primary
                   </div>
                   <div 
                     className="w-20 h-20 rounded-lg shadow-md flex items-center justify-center text-white font-bold"
                     style={{ backgroundColor: form.secondaryColor }}
                   >
                     Secondary
                   </div>
                 </div>
               </div>
             </div>
           )}

           {/* Business Hours Tab */}
           {activeTab === 'hours' && (
             <div className="space-y-6">
               <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
               
               <div className="space-y-4">
                 {Object.entries(form.businessHours).map(([day, hours]) => (
                   <div key={day} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                     <div className="w-24">
                       <span className="font-medium text-gray-900 capitalize">{day}</span>
                     </div>
                     
                     <div className="flex items-center space-x-2">
                       <input
                         type="checkbox"
                         checked={!hours.closed}
                         onChange={(e) => handleBusinessHoursChange(day, 'closed', !e.target.checked)}
                         className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                       />
                       <span className="text-sm text-gray-600">Open</span>
                     </div>

                     {!hours.closed && (
                       <>
                         <div>
                           <input
                             type="time"
                             value={hours.open}
                             onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                             className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                           />
                         </div>
                         <span className="text-gray-500">to</span>
                         <div>
                           <input
                             type="time"
                             value={hours.close}
                             onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                             className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                           />
                         </div>
                       </>
                     )}

                     {hours.closed && (
                       <span className="text-red-500 font-medium">Closed</span>
                     )}
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* Features Tab */}
           {activeTab === 'features' && (
             <div className="space-y-6">
               <h2 className="text-2xl font-bold text-gray-900 mb-6">Features & Achievements</h2>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Features */}
                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Institute Features</h3>
                   <div className="space-y-3">
                     {form.features.map((feature, index) => (
                       <div key={index} className="flex items-center space-x-2">
                         <input
                           type="text"
                           value={feature}
                           onChange={(e) => handleArrayChange('features', index, e.target.value)}
                           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                           placeholder="Feature name"
                         />
                         <button
                           onClick={() => removeArrayItem('features', index)}
                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                         >
                           🗑️
                         </button>
                       </div>
                     ))}
                     <button
                       onClick={() => addArrayItem('features')}
                       className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors"
                     >
                       + Add Feature
                     </button>
                   </div>
                 </div>

                 {/* Achievements */}
                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements</h3>
                   <div className="space-y-3">
                     {form.achievements.map((achievement, index) => (
                       <div key={index} className="flex items-center space-x-2">
                         <input
                           type="text"
                           value={achievement}
                           onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                           placeholder="Achievement"
                         />
                         <button
                           onClick={() => removeArrayItem('achievements', index)}
                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                         >
                           🗑️
                         </button>
                       </div>
                     ))}
                     <button
                       onClick={() => addArrayItem('achievements')}
                       className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors"
                     >
                       + Add Achievement
                     </button>
                   </div>
                 </div>
               </div>

               {/* Booking Settings */}
               <div className="bg-gray-50 p-6 rounded-lg">
                 <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Settings</h3>
                 <div className="space-y-4">
                   <div className="flex items-center space-x-3">
                     <input
                       type="checkbox"
                       id="allowOnlineBooking"
                       checked={form.allowOnlineBooking}
                       onChange={(e) => handleInputChange('allowOnlineBooking', e.target.checked)}
                       className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                     />
                     <label htmlFor="allowOnlineBooking" className="text-sm font-medium text-gray-700">
                       Allow Online Booking
                     </label>
                   </div>

                   <div className="flex items-center space-x-3">
                     <input
                       type="checkbox"
                       id="requireAdvancePayment"
                       checked={form.requireAdvancePayment}
                       onChange={(e) => handleInputChange('requireAdvancePayment', e.target.checked)}
                       className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                     />
                     <label htmlFor="requireAdvancePayment" className="text-sm font-medium text-gray-700">
                       Require Advance Payment
                     </label>
                   </div>

                   {form.requireAdvancePayment && (
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Advance Payment Percentage
                       </label>
                       <input
                         type="number"
                         min="1"
                         max="100"
                         value={form.advancePaymentPercentage}
                         onChange={(e) => handleInputChange('advancePaymentPercentage', parseInt(e.target.value))}
                         className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                       />
                       <span className="ml-2 text-sm text-gray-600">%</span>
                     </div>
                   )}
                 </div>
               </div>
             </div>
           )}

           {/* Policies Tab */}
           {activeTab === 'policies' && (
             <div className="space-y-6">
               <h2 className="text-2xl font-bold text-gray-900 mb-6">Policies & Terms</h2>
               
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Cancellation Policy
                   </label>
                   <textarea
                     value={form.cancellationPolicy}
                     onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                     rows={3}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="Describe your cancellation policy..."
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Refund Policy
                   </label>
                   <textarea
                     value={form.refundPolicy}
                     onChange={(e) => handleInputChange('refundPolicy', e.target.value)}
                     rows={3}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="Describe your refund policy..."
                   />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Terms and Conditions
                   </label>
                   <textarea
                     value={form.termsAndConditions}
                     onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
                     rows={5}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="Enter your terms and conditions..."
                   />
                 </div>
               </div>
             </div>
           )}

           {/* SEO Tab */}
           {activeTab === 'seo' && (
             <div className="space-y-6">
               <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO Settings</h2>
               
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Meta Title
                   </label>
                   <input
                     type="text"
                     value={form.metaTitle}
                     onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="Excellence Coaching Institute - Best Coaching for Competitive Exams"
                     maxLength="60"
                   />
                   <p className="text-sm text-gray-500 mt-1">{form.metaTitle.length}/60 characters</p>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Meta Description
                   </label>
                   <textarea
                     value={form.metaDescription}
                     onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                     rows={3}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="Join Excellence Coaching Institute for comprehensive preparation..."
                     maxLength="160"
                   />
                   <p className="text-sm text-gray-500 mt-1">{form.metaDescription.length}/160 characters</p>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Meta Keywords
                   </label>
                   <input
                     type="text"
                     value={form.metaKeywords}
                     onChange={(e) => handleInputChange('metaKeywords', e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                     placeholder="coaching institute, JEE, NEET, competitive exams"
                   />
                   <p className="text-sm text-gray-500 mt-1">Separate keywords with commas</p>
                 </div>
               </div>
             </div>
           )}
         </div>

         {/* Footer */}
         <div className="bg-gray-50 px-8 py-6 border-t">
           <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
             <div className="flex items-center space-x-4">
               <button
                 onClick={save}
                 className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md"
               >
                 Save Settings
               </button>
               
               {saved && (
                 <div className="flex items-center text-green-600">
                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                   Settings saved successfully!
                 </div>
               )}
             </div>

             <div className="text-right">
               <p className="text-sm font-medium text-gray-700 mb-1">Preview your booking page:</p>
               <a 
                 href={previewUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-purple-600 hover:text-purple-800 font-medium break-all"
               >
                 {previewUrl}
               </a>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default BookingSettings;
=======
  const previewUrl = `${window.location.origin}/${form.ob_name || ''}`;

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Booking Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">OB Name</label>
          <input
            type="text"
            value={form.ob_name}
            onChange={e => setForm({ ...form, ob_name: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="Unique ob_name"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.ob_enable}
            onChange={e => setForm({ ...form, ob_enable: e.target.checked })}
            id="ob_enable"
          />
          <label htmlFor="ob_enable" className="text-sm text-gray-700">
            Enable Booking Page
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            type="text"
            value={form.logo}
            onChange={e => setForm({ ...form, logo: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Moto</label>
          <input
            type="text"
            value={form.moto}
            onChange={e => setForm({ ...form, moto: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="Empowering Students"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            rows={3}
            placeholder="About your institution..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Custom Domain</label>
          <input
            type="text"
            value={form.domain}
            onChange={e => setForm({ ...form, domain: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
            placeholder="e.g. booking.mycoaching.in"
          />
        </div>
      </div>

      <button
        onClick={save}
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Save
      </button>

      {saved && <p className="text-green-600 mt-3">✓ Settings saved successfully</p>}

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Preview Booking Page:</label>
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {previewUrl}
        </a>
      </div>
    </div>
  );
};

export default BookingSettings;
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
