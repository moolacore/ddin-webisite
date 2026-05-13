import React, { useState } from 'react';
import axios from 'axios';
import '../PaymentModal.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const WASACModal = ({ service, user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerId: '', // Account number
    customerName: '',
    amount: '',
    customerEmail: '',
    customerPhone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/process-payment`, {
        billerCode: 'water',
        productCode: 'water',
        customerId: formData.customerId,
        customerName: formData.customerName,
        amount: formData.amount,
        currencyCode: 'RWF',
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        provider: 'mtn'
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {success ? (
          <div className="success-state">
            <h2>✅ Water Payment Successful!</h2>
            <p>Your WASAC bill has been paid</p>
          </div>
        ) : (
          <>
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>💧 WASAC Water Bill</h2>
            <p className="service-subtitle">Water and Sanitation Company</p>
            
            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Account Number *</label>
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  required
                  placeholder="Your account number"
                />
                <small>Found on your water bill</small>
              </div>

              <div className="form-group">
                <label>Account Holder Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="Name on account"
                />
              </div>

              <div className="form-group">
                <label>Amount (RWF) *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  min="500"
                  max="1000000"
                />
                <small>Min: 500 | Max: 1,000,000</small>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  required
                  placeholder="example@email.com"
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  placeholder="+250789595309"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? 'Processing...' : `Pay ${formData.amount || '0'} RWF`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default WASACModal;