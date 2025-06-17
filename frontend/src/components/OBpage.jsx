import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useApi } from '../contexts/ApiContext'; // Adjust path as needed
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  BookOpen, 
  Calendar, 
  Star, 
  CheckCircle, 
  Globe, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin,
  WhatsApp,
  ArrowRight,
  Trophy,
  Target,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';

export default function OBPage() {
  const { obpage } = useParams();
  const api = useApi();
  const [institutionData, setInstitutionData] = useState(null);
  const [batches, setBatches] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [institutionRes, batchesRes, packagesRes] = await Promise.all([
          api.getInstitutionSettings(),
          api.batchList(),
          api.packagesList()
        ]);
        
        setInstitutionData(institutionRes.data);
        setBatches(batchesRes.data);
        setPackages(packagesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [obpage]);

  const handleBookNow = (batch = null, pkg = null) => {
    setSelectedBatch(batch);
    setSelectedPackage(pkg);
    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!institutionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Institute not found</h2>
          <p className="text-gray-600 mt-2">Please check the URL and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <img 
                src={institutionData.logo} 
                alt={institutionData.institutionName}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {institutionData.institutionName}
                </h1>
                <p className="text-sm text-gray-600">{institutionData.moto}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#batches" className="text-gray-700 hover:text-violet-600 font-medium">Classes</a>
              <a href="#packages" className="text-gray-700 hover:text-violet-600 font-medium">Packages</a>
              <a href="#about" className="text-gray-700 hover:text-violet-600 font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-violet-600 font-medium">Contact</a>
              <button 
                onClick={() => handleBookNow()}
                className="bg-violet-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet-900 via-violet-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              {institutionData.moto}
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-violet-100 max-w-3xl mx-auto">
              {institutionData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => handleBookNow()}
                className="bg-white text-violet-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <a 
                href={`tel:${institutionData.phone}`}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-violet-900 transition-colors flex items-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {institutionData.achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {index === 0 && <Users className="h-8 w-8 text-violet-600" />}
                  {index === 1 && <Trophy className="h-8 w-8 text-violet-600" />}
                  {index === 2 && <Award className="h-8 w-8 text-violet-600" />}
                  {index === 3 && <Star className="h-8 w-8 text-violet-600" />}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">{achievement.split(' ')[0]}</p>
                <p className="text-gray-600">{achievement.split(' ').slice(1).join(' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes/Batches Section */}
      <section id="batches" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Classes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our expertly designed courses tailored for different competitive exams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {batches.map((batch) => (
              <div key={batch.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      batch.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      batch.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {batch.status}
                    </span>
                    <span className="text-2xl font-bold text-violet-600">₹{batch.fee.toLocaleString()}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{batch.batchName}</h3>
                  <p className="text-gray-600 mb-4">{batch.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      <span>By {batch.teacherName}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{batch.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{batch.enrolledStudents.length}/{batch.estimatedCapacity} students</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-2">
                      {batch.subjects.map((subject, index) => (
                        <span key={index} className="bg-violet-100 text-violet-800 px-2 py-1 rounded text-xs font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleBookNow(batch)}
                    className="w-full bg-violet-600 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors"
                  >
                    Enroll in This Batch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Package</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Flexible packages designed to meet different learning needs and budgets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
                index === 1 ? 'ring-4 ring-violet-500 scale-105' : ''
              }`}>
                {index === 1 && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-violet-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-4xl font-bold text-violet-600 mb-2">₹{pkg.price.toLocaleString()}</div>
                    <p className="text-gray-600">{pkg.duration}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-center">{pkg.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => handleBookNow(null, pkg)}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                      index === 1 
                        ? 'bg-violet-600 text-white hover:bg-violet-700' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Choose {pkg.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive support to ensure your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {institutionData.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature}</h3>
                <p className="text-gray-600 text-sm">Quality assured {feature.toLowerCase()} for better results</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About {institutionData.institutionName}</h2>
              <p className="text-lg text-gray-600 mb-6">{institutionData.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-violet-600 mr-3" />
                  <span className="text-gray-700">Flexible timing options available</span>
                </div>
                <div className="flex items-center">
                  <HeartHandshake className="h-6 w-6 text-violet-600 mr-3" />
                  <span className="text-gray-700">Personal attention to every student</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-violet-600 mr-3" />
                  <span className="text-gray-700">Comprehensive study material provided</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h3>
              <div className="space-y-3">
                {Object.entries(institutionData.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 capitalize">{day}</span>
                    <span className="text-gray-600">
                      {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to start your journey? Contact us today for more information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-violet-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">{institutionData.phone}</p>
              {institutionData.alternatePhone && (
                <p className="text-gray-300">{institutionData.alternatePhone}</p>
              )}
            </div>
            
            <div className="text-center">
              <div className="bg-violet-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">{institutionData.email}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-violet-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300">
                {institutionData.address}, {institutionData.city}, {institutionData.state} {institutionData.pincode}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-violet-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              <div className="flex justify-center space-x-4 mt-4">
                <a href={institutionData.facebook} className="text-gray-300 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href={institutionData.instagram} className="text-gray-300 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href={institutionData.youtube} className="text-gray-300 hover:text-white">
                  <Youtube className="h-6 w-6" />
                </a>
                <a href={institutionData.linkedin} className="text-gray-300 hover:text-white">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${institutionData.whatsapp.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <Phone className="h-6 w-6" />
      </a>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Book Your Seat</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 {institutionData.phone}</p>
                  <p>📧 {institutionData.email}</p>
                  <p>📍 {institutionData.address}, {institutionData.city}</p>
                </div>
              </div>
              
              {selectedBatch && (
                <div className="mb-6 p-4 bg-violet-50 rounded-lg">
                  <h4 className="font-semibold text-violet-900 mb-2">Selected Batch</h4>
                  <p className="text-violet-800">{selectedBatch.batchName}</p>
                  <p className="text-sm text-violet-600">Fee: ₹{selectedBatch.fee.toLocaleString()}</p>
                </div>
              )}
              
              {selectedPackage && (
                <div className="mb-6 p-4 bg-violet-50 rounded-lg">
                  <h4 className="font-semibold text-violet-900 mb-2">Selected Package</h4>
                  <p className="text-violet-800">{selectedPackage.name}</p>
                  <p className="text-sm text-violet-600">Price: ₹{selectedPackage.price.toLocaleString()}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <a
                  href={`tel:${institutionData.phone}`}
                  className="w-full bg-violet-600 text-white py-3 rounded-lg font-medium hover:bg-violet-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
                
                <a
                  href={`https://wa.me/${institutionData.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in enrolling${selectedBatch ? ` in ${selectedBatch.batchName}` : ''}${selectedPackage ? ` for ${selectedPackage.name}` : ''}. Can you provide more details?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
                
                <button 
                  onClick={() => window.location.href = `mailto:${institutionData.email}?subject=Enrollment Inquiry&body=Hi, I'm interested in enrolling${selectedBatch ? ` in ${selectedBatch.batchName}` : ''}${selectedPackage ? ` for ${selectedPackage.name}` : ''}. Please provide more details.`}
                  className="w-full border-2 border-violet-600 text-violet-600 py-3 rounded-lg font-medium hover:bg-violet-600 hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Send Email</span>
                </button>
              </div>
              
              <div className="mt-6 text-xs text-gray-500 text-center">
                <p>By contacting us, you agree to our terms and conditions.</p>
                <p className="mt-1">{institutionData.cancellationPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <img 
                src={institutionData.logo} 
                alt={institutionData.institutionName}
                className="h-10 w-10 rounded-full object-cover"
              />
              <h3 className="text-xl font-bold">{institutionData.institutionName}</h3>
            </div>
            <p className="text-gray-300 mb-4">{institutionData.moto}</p>
            <p className="text-sm text-gray-400">
              © 2025 {institutionData.institutionName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
=======
import axios from 'axios';

export default function OBPage() {
  const { obpage } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/get-ob-details/${obpage}`)
      .then(({ data }) => setData(data))
      .catch(err => console.error('Error fetching OB page:', err));
  }, [obpage]);

  if (!data) return <div className="text-center py-10 text-lg font-medium text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center space-x-4">
          <img src={data.institution.logo} alt="Logo" className="h-12 w-12 object-contain rounded-md border" />
          <h1 className="text-2xl font-bold text-gray-800">{data.institution.name}</h1>
        </div>
      </header>

      {/* Institution Info */}
      <section className="max-w-4xl mx-auto mt-6 px-4">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <p className="text-gray-600 italic text-lg">"{data.institution.moto}"</p>
          <p className="text-gray-700">{data.institution.description}</p>
        </div>
      </section>

      {/* Classes */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Classes</h2>
        {Object.entries(data.classes).map(([subject, classes]) => (
          <div key={subject} className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-3">{subject}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {classes.map(cls => (
                <div
                  key={cls.id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-md transition duration-200 border"
                >
                  <h4 className="text-lg font-semibold text-gray-900">{cls.title}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
    
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
