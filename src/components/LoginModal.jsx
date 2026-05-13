import React, { useState } from 'react';
import axios from 'axios';
import './LoginModal.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const LoginModal = ({ service, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: formData.username,
        password: formData.password
      });

      if (response.data.success) {
        console.log('✅ Login successful');
        onLoginSuccess(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check username and password.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('Signup coming soon! Use login with test credentials:\nUsername: cmahame\nPassword: Test@123');
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="login-header">
          <h2>{service.icon} {service.name}</h2>
          <p>Login to continue payment</p>
        </div>

        {error && (
          <div className="error-box">
            <p>{error}</p>
          </div>
        )}

        <div className="login-tabs">
          <button 
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            🔐 Login
          </button>
          <button 
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            ✍️ Create Account
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
              <small>Test: cmahame</small>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              <small>Test: Test@123</small>
            </div>

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose username"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Creating...' : 'Create Account'}
            </button>

            <p className="test-info">
              💡 For testing, use:<br/>
              Username: cmahame<br/>
              Password: Test@123
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;