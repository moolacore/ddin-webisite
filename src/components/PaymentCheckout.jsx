import React, { useState, useEffect } from 'react';
import './PaymentCheckout.css';

/**
 * Enhanced PaymentCheckout Component
 * Supports both standalone payments and service-based payments
 */
const PaymentCheckout = ({ initialData, onSuccess, serviceData }) => {
  // ==================== STATE ====================
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'RWF',
    phone: '',
    email: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [step, setStep] = useState('form'); // form, processing, success, error
  const [pollInterval, setPollInterval] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  // ==================== EFFECTS ====================

  // Initialize form with provided data
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        amount: initialData.amount || '',
        currency: initialData.currency || 'RWF',
        phone: initialData.phone || '',
        email: initialData.email || '',
        description: initialData.description || '',
      }));
    }
  }, [initialData]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [pollInterval]);

  // ==================== HANDLERS ====================

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const validateForm = () => {
    const { amount, phone, email } = formData;

    if (!amount || parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }

    if (!phone || phone.length < 10) {
      setError('Valid phone number is required (min 10 digits)');
      return false;
    }

    if (!email || !email.includes('@')) {
      setError('Valid email address is required');
      return false;
    }

    return true;
  };

  const initiatePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setStep('processing');

    try {
      const response = await fetch(`${API_URL}/api/payments/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          currency: formData.currency,
          phone: formData.phone,
          email: formData.email,
          description: formData.description || 'Payment via DDIN Services',
          metadata: {
            serviceData: serviceData || null,
            ...serviceData,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate payment');
      }

      const txnId = data.data.transaction_id;
      setTransactionId(txnId);
      setPaymentStatus(data.data.status);
      setSuccess(`Payment initiated! Transaction ID: ${txnId}`);

      // Start polling for payment status
      startStatusPolling(txnId);

      // After 2 seconds, move to waiting screen
      setTimeout(() => {
        if (data.data.status === 'completed') {
          setStep('success');
          stopStatusPolling();
          if (onSuccess) onSuccess(txnId);
        } else {
          setStep('waiting');
        }
      }, 2000);
    } catch (err) {
      console.error('Payment initiation error:', err);
      setError(err.message || 'Failed to initiate payment. Please try again.');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const startStatusPolling = (txnId) => {
    const interval = setInterval(() => {
      verifyPayment(txnId);
    }, 3000);

    setPollInterval(interval);
  };

  const stopStatusPolling = () => {
    if (pollInterval) {
      clearInterval(pollInterval);
      setPollInterval(null);
    }
  };

  const verifyPayment = async (txnId) => {
    try {
      const response = await fetch(`${API_URL}/api/payments/${txnId}/verify`);
      const data = await response.json();

      if (data.success) {
        setPaymentStatus(data.data.status);

        if (data.data.status === 'completed') {
          setStep('success');
          stopStatusPolling();
          if (onSuccess) onSuccess(txnId);
        }
      }
    } catch (err) {
      console.error('Payment verification error:', err);
    }
  };

  const handleReset = () => {
    // If we have initial data (from service), return to empty form
    // Otherwise reset completely
    if (initialData) {
      setFormData({
        amount: initialData.amount || '',
        currency: initialData.currency || 'RWF',
        phone: initialData.phone || '',
        email: initialData.email || '',
        description: initialData.description || '',
      });
    } else {
      setFormData({
        amount: '',
        currency: 'RWF',
        phone: '',
        email: '',
        description: '',
      });
    }
    setTransactionId(null);
    setPaymentStatus(null);
    setError(null);
    setSuccess(null);
    setStep('form');
    stopStatusPolling();
  };

  // ==================== RENDER ====================

  if (step === 'success') {
    return (
      <div className="payment-container">
        <div className="payment-card success-card">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p className="transaction-id">Transaction ID: {transactionId}</p>
          <div className="payment-details">
            {serviceData && (
              <>
                <p>
                  Service: <strong>{serviceData.serviceName}</strong>
                </p>
              </>
            )}
            <p>
              Amount: <strong>{formData.amount} {formData.currency}</strong>
            </p>
            <p>
              Phone: <strong>{formData.phone}</strong>
            </p>
            <p>
              Status: <strong className="status-badge completed">{paymentStatus}</strong>
            </p>
          </div>
          <button className="btn-primary" onClick={handleReset}>
            {serviceData ? 'Make Another Payment' : 'New Payment'}
          </button>
        </div>
      </div>
    );
  }

  if (step === 'error') {
    return (
      <div className="payment-container">
        <div className="payment-card error-card">
          <div className="error-icon">⚠</div>
          <h2>Payment Failed</h2>
          <p className="error-message">{error}</p>
          <div className="error-details">
            {transactionId && (
              <p>
                Transaction ID: <code>{transactionId}</code>
              </p>
            )}
          </div>
          <div className="button-group">
            <button className="btn-secondary" onClick={handleReset}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'processing' || step === 'waiting') {
    return (
      <div className="payment-container">
        <div className="payment-card processing-card">
          <div className="spinner"></div>
          <h2>Processing Payment</h2>
          <p>Transaction ID: {transactionId}</p>
          <div className="status-info">
            <p className="status-text">
              {step === 'processing'
                ? 'Initiating payment...'
                : 'Waiting for payment confirmation...'}
            </p>
            {serviceData && (
              <p className="status-detail">
                Service: <strong>{serviceData.serviceName}</strong>
              </p>
            )}
            <p className="status-detail">
              Amount: <strong>{formData.amount} {formData.currency}</strong>
            </p>
            {paymentStatus && (
              <p className="payment-status">
                Current Status: <strong>{paymentStatus}</strong>
              </p>
            )}
          </div>
          <p className="note">Do not close this window</p>
        </div>
      </div>
    );
  }

  // Default form view
  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h1>Payment Checkout</h1>
          {serviceData && (
            <p className="service-info">Service: {serviceData.serviceName}</p>
          )}
          <p>Complete your payment securely via DDIN</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={initiatePayment} className="payment-form">
          {/* Amount Section */}
          <div className="form-section">
            <h3>Payment Amount</h3>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <div className="amount-input-wrapper">
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  step="0.01"
                  min="0"
                  disabled={loading || (initialData && initialData.amount)}
                  required
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="RWF">RWF</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+250..."
                  disabled={loading || (initialData && initialData.phone)}
                  required
                />
                <small>Format: +250XXXXXXXXX</small>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  disabled={loading || (initialData && initialData.email)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          {!serviceData && (
            <div className="form-section">
              <h3>Payment Details</h3>
              <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What is this payment for?"
                  rows="3"
                  disabled={loading}
                ></textarea>
              </div>
            </div>
          )}

          {/* Service Info Display */}
          {serviceData && (
            <div className="form-section">
              <h3>Service Details</h3>
              <div className="service-summary">
                {Object.entries(serviceData)
                  .filter(([key]) => !['serviceName', 'serviceId', 'serviceCategory', 'amount', 'phone', 'email'].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="summary-line">
                      <span className="label">{key}:</span>
                      <span className="value">{value}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="security-notice">
            <span className="lock-icon">🔒</span>
            <p>Your payment is secure and encrypted. DDIN processes payments safely.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary btn-large"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>

          <p className="terms">
            By clicking "Complete Payment", you agree to our terms of service
          </p>
        </form>
      </div>

      {/* Information Panel */}
      <div className="info-panel">
        <h4>About This Payment</h4>
        <ul>
          <li>
            <strong>Secure:</strong> All payments are encrypted and processed securely
          </li>
          <li>
            <strong>Fast:</strong> Instant payment confirmation via DDIN network
          </li>
          <li>
            <strong>Multiple Methods:</strong> Pay with mobile money, cards, and more
          </li>
          <li>
            <strong>Support:</strong> 24/7 support available
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentCheckout;
