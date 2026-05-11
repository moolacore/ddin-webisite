import React, { useState } from 'react';
import './SimpleServiceModal.css';

/**
 * SimpleServiceModal Component
 * Single step: Fill form and proceed to payment
 * No confirmation step - direct to payment
 */
const SimpleServiceModal = ({ service, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen || !service) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    service.fields?.forEach((field) => {
      const value = formData[field.name];

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.type === 'tel' && value && !value.includes('+')) {
        newErrors[field.name] = 'Phone must start with +';
      }

      if (field.type === 'number' && value) {
        const numValue = parseFloat(value);
        if (field.min && numValue < field.min) {
          newErrors[field.name] = `Minimum amount is ${field.min}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Get phone and email from form if available
      const phone = formData.phone || '';
      const email = formData.email || '';

      // Create payment payload
      const paymentPayload = {
        ...formData,
        phone: phone,
        email: email
      };

      // Call parent submit handler
      onSubmit(paymentPayload);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to process. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getFieldValue = (fieldName) => {
    return formData[fieldName] || '';
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* Modal */}
      <div className="simple-modal">
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-icon" style={{ color: service.color }}>
            {service.icon}
          </div>
          <h2>{service.name}</h2>
          <p className="modal-subtitle">{service.category}</p>
        </div>

        {/* Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            {service.fields?.map((field) => (
              <div key={field.name} className="form-group">
                <label htmlFor={field.name} className="form-label">
                  {field.label}
                  {field.required && <span className="required">*</span>}
                </label>

                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={getFieldValue(field.name)}
                    onChange={handleInputChange}
                    className={`form-input ${errors[field.name] ? 'error' : ''}`}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={getFieldValue(field.name)}
                    onChange={handleInputChange}
                    min={field.min}
                    className={`form-input ${errors[field.name] ? 'error' : ''}`}
                  />
                )}

                {errors[field.name] && (
                  <span className="error-message">{errors[field.name]}</span>
                )}
              </div>
            ))}
          </div>

          {/* Error message */}
          {errors.submit && (
            <div className="alert alert-error">
              {errors.submit}
            </div>
          )}

          {/* Security notice */}
          <div className="security-notice">
            <span className="lock-icon">🔒</span>
            <p>Your information is encrypted and secure</p>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                '💳 Proceed to Payment'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SimpleServiceModal;
