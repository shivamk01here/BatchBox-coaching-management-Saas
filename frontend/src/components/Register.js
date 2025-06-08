import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'school',
    adminName: '',
    adminEmail: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
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
    setErrors({});

    const result = await register(formData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrors(result.errors || {});
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <h1>Register Institution</h1>
          <p>Create an account for your educational institution</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-section">
            <h3>Institution Details</h3>
            
            <div className="form-group">
              <label htmlFor="name">Institution Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter institution name"
              />
              {errors.name && <span className="error-text">{errors.name[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Institution Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter institution email"
              />
              {errors.email && <span className="error-text">{errors.email[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="error-text">{errors.phone[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type">Institution Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="school">School</option>
                <option value="college">College</option>
                <option value="university">University</option>
              </select>
              {errors.type && <span className="error-text">{errors.type[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter institution address"
                rows="3"
              />
              {errors.address && <span className="error-text">{errors.address[0]}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Administrator Details</h3>
            
            <div className="form-group">
              <label htmlFor="adminName">Administrator Name</label>
              <input
                type="text"
                id="adminName"
                name="adminName"
                value={formData.adminName}
                onChange={handleChange}
                required
                placeholder="Enter administrator name"
              />
              {errors.adminName && <span className="error-text">{errors.adminName[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="adminEmail">Administrator Email</label>
              <input
                type="email"
                id="adminEmail"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                required
                placeholder="Enter administrator email"
              />
              {errors.adminEmail && <span className="error-text">{errors.adminEmail[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
              />
              {errors.password && <span className="error-text">{errors.password[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                placeholder="Confirm password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register Institution'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? {' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;