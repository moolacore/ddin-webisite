import React, { useState } from 'react';
import axios from 'axios';
import '../PaymentModal.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const StarTimesModal = ({ service, user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    package: 'basic',
    amount: '5000',
    customerEmail: '',
    customerPhone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const packages = [
    { value: 'basic', label: 'Basic - 5,000 RWF', price: '5000' },
    { value: 'standard', label: 'Standard - 10,000 RWF', price: '10000' },
    { value: 'premium', label: 'Premium - 15,000 RWF', price: '15000' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'package') {
      const selectedPkg = packages.find(p => p.value === value);
      if (selectedPkg) {
        setFormData(prev => ({
          ...prev,
          package: value,
          amount: selectedPkg.price
        }));
      }
    }
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/process-payment`, {
        billerCode: 'startimes',
        productCode: 'startimes',
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
            <h2>✅ Subscription Successful!</h2>
            <p>Your StarTimes service is now active</p>
          </div>
        ) : (
          <>
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>📺 StarTimes Subscription</h2>
            <p className="service-subtitle">Digital TV Service</p>
            
            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Decoder Number *</label>
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  required
                  placeholder="Your decoder number"
                />
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
                <label>Select Package *</label>
                <select 
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  required
                >
                  {packages.map(pkg => (
                    <option key={pkg.value} value={pkg.value}>
                      {pkg.label}
                    </option>
                  ))}
                </select>
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
                {loading ? 'Processing...' : `Pay ${formData.amount} RWF`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default StarTimesModal;