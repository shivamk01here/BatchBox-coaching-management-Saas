import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Mail, 
  Lock, 
  User, 
  Building, 
  Phone, 
  MapPin,
  ArrowRight, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
<<<<<<< HEAD
    instituteName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
=======
    institution_name: '',
    owner_name: '',
    surname: '',
    email: '',
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  
=======
  const [errors, setErrors] = useState({});

>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(formData);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.instituteName || !formData.ownerName || !formData.email) {
        setError('Please fill in all required fields');
        return;
      }
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 border-2 border-white rounded-lg relative">
                <div className="absolute inset-1 bg-white rounded-sm opacity-80"></div>
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="absolute bottom-1 left-1 right-1 h-1 bg-slate-700 rounded-full"></div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Your Account</h1>
          <p className="text-slate-600">Join thousands of institutes using BatchBox</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-slate-800' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-slate-800 text-white' : 'bg-slate-200'}`}>
                {step > 1 ? <CheckCircle size={16} /> : '1'}
              </div>
              <span className="text-sm font-medium">Basic Info</span>
            </div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-slate-800 text-white' : 'bg-slate-200'}`}>
                {step > 2 ? <CheckCircle size={16} /> : '2'}
              </div>
              <span className="text-sm font-medium">Security</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-slate-800 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">Institute Information</h2>
                  <p className="text-slate-600 text-sm">Tell us about your institution</p>
                </div>

                {/* Institute Name */}
                <div>
                  <label htmlFor="instituteName" className="block text-sm font-medium text-slate-700 mb-2">
                    Institution Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="instituteName"
                      name="instituteName"
                      type="text"
                      required
                      value={formData.instituteName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
                      placeholder="e.g., Excel Coaching Academy"
                    />
                  </div>
                </div>

                {/* Owner Name */}
                <div>
                  <label htmlFor="ownerName" className="block text-sm font-medium text-slate-700 mb-2">
                    Owner/Director Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="ownerName"
                      name="ownerName"
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-slate-900 placeholder-slate-400 resize-none"
                      placeholder="Enter your institute address"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  Continue
                  <ArrowRight size={20} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">Create Password</h2>
                  <p className="text-slate-600 text-sm">Secure your account with a strong password</p>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Minimum 8 characters with letters, numbers, and symbols
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-slate-900 placeholder-slate-400"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-400 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 mb-4">Already have an account?</p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            Sign in to your account
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="font-medium text-slate-600 hover:text-slate-800 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="font-medium text-slate-600 hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
=======
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gray-100 flex flex-col justify-end p-10">
        <p className="text-gray-500 italic text-sm text-center">
          "Education is the most powerful weapon which you can use to change the world." – Nelson Mandela
        </p>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-6 p-8 shadow-xl rounded-xl border border-gray-200">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Register Institution</h2>
            <p className="text-sm text-gray-500">Create an account for your educational institution</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Institution Name</label>
              <input
                type="text"
                name="institution_name"
                value={formData.institution_name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              {errors.institution_name && <p className="text-red-500 text-sm mt-1">{errors.institution_name[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Owner Name</label>
              <input
                type="text"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              {errors.owner_name && <p className="text-red-500 text-sm mt-1">{errors.owner_name[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Surname (optional)</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-md font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Institution'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="text-purple-600 font-medium">Sign in here</Link>
>>>>>>> 02401165eb2726f55949e8aae6803a222b65777f
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;