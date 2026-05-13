import React, { useState } from 'react';
import axios from 'axios';
import '../PaymentModal.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const IremboModal = ({ service, user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    serviceType: 'passport',
    amount: '',
    customerEmail: '',
    customerPhone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const services = [
    { value: 'passport', label: 'Passport - 50,000 RWF', price: '50000' },
    { value: 'id', label: 'ID Card - 10,000 RWF', price: '10000' },
    { value: 'visa', label: 'Visa Application - 100,000 RWF', price: '100000' },
    { value: 'license', label: 'Driving License - 15,000 RWF', price: '15000' },
    { value: 'certificate', label: 'Birth Certificate - 5,000 RWF', price: '5000' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'serviceType') {
      const selectedService = services.find(s => s.value === value);
      if (selectedService) {
        setFormData(prev => ({
          ...prev,
          serviceType: value,
          amount: selectedService.price
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
        billerCode: 'irembo',
        productCode: formData.serviceType,
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
            <h2>✅ Application Submitted!</h2>
            <p>Your Irembo service request has been processed</p>
          </div>
        ) : (
          <>
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>🏛️ Irembo Services</h2>
            <p className="service-subtitle">Government Services Portal</p>
            
            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>ID Number *</label>
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  required
                  placeholder="Your national ID or passport"
                />
              </div>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label>Select Service *</label>
                <select 
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  {services.map(svc => (
                    <option key={svc.value} value={svc.value}>
                      {svc.label}
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

export default IremboModal;