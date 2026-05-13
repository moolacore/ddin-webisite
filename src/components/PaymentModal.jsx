import React, { useState } from 'react';
import axios from 'axios';
import './PaymentModal.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const PaymentModal = ({ service, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    amount: '',
    customerEmail: '',
    customerPhone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/process-payment`, {
        billerCode: service.code,
        productCode: service.code,
        ...formData,
        currencyCode: 'RWF',
        provider: 'mtn'
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      }
    } catch (error) {
      alert('Payment failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {success ? (
          <div className="success-state">
            <h2>✅ Payment Successful!</h2>
            <p>Thank you for your payment</p>
          </div>
        ) : (
          <>
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>{service.icon} {service.name}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer ID</label>
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  required
                  placeholder="Enter customer ID"
                />
              </div>

              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Amount (RWF)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
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
                <label>Phone</label>
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

export default PaymentModal;