import React, { useState } from 'react';
import '../PaymentModal.css';

const AirtelModal = ({ service, user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    phone: '',
    amount: '',
    package: 'other'
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const packages = [
    { value: 'other', label: 'Custom Amount' },
    { value: '1000', label: '1,000 RWF' },
    { value: '2500', label: '2,500 RWF' },
    { value: '5000', label: '5,000 RWF' },
    { value: '10000', label: '10,000 RWF' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'package' && value !== 'other') {
      setFormData({
        ...formData,
        package: value,
        amount: value
      });
    }
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.phone || formData.phone.length < 10) {
      setError('Valid phone number required');
      return;
    }
    
    if (!formData.amount) {
      setError('Please select or enter amount');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {success ? (
          <div className="success-state">
            <h2>✅ Airtime Loaded!</h2>
            <p>Your Airtel airtime has been purchased</p>
          </div>
        ) : (
          <>
            <button className="close-btn" onClick={onClose}>×</button>
            <h2>📱 Airtel Airtime</h2>
            <p className="service-subtitle">Buy airtime and data bundles</p>
            
            {error && <div className="error-box">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Airtel Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+250701234567 or 0701234567"
                />
                <small>Must be valid Airtel number</small>
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

              {formData.package === 'other' && (
                <div className="form-group">
                  <label>Custom Amount (RWF) *</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    placeholder="100"
                    min="100"
                    max="100000"
                  />
                  <small>Min: 100 | Max: 100,000</small>
                </div>
              )}

              <button type="submit" className="btn-submit">
                Buy {formData.amount ? `${formData.amount} RWF` : 'Airtime'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AirtelModal;