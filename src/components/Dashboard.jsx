import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import LoginModal from './LoginModal';
import RRAModal from './modals/RRAModal';
import EUCLModal from './modals/EUCLModal';
import WASACModal from './modals/WASACModal';
import MTNModal from './modals/MTNModal';
import AirtelModal from './modals/AirtelModal';
import StarTimesModal from './modals/StarTimesModal';
import IremboModal from './modals/IremboModal';
import './Dashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/services`);
      const data = await response.json();

      if (data.success) {
        setServices(data.data);
        console.log('✅ Services loaded:', data.data.length);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (service) => {
    setSelectedService(service);
    if (user) {
      setShowPaymentModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = (data) => {
    setUser(data.user);
    setShowLoginModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setNotification({
      type: 'success',
      title: '✅ Payment Successful!',
      message: 'Your transaction has been processed.',
    });
    setShowPaymentModal(false);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = () => {
    setUser(null);
    setShowPaymentModal(false);
  };

  // Map service code to modal component
  const getModalComponent = () => {
    if (!selectedService || !user) return null;

    const props = {
      service: selectedService,
      user: user,
      onClose: () => setShowPaymentModal(false),
      onSuccess: handlePaymentSuccess
    };

    switch (selectedService.code) {
      case 'tax':
        return <RRAModal {...props} />;
      case 'electricity':
        return <EUCLModal {...props} />;
      case 'water':
        return <WASACModal {...props} />;
      case 'mtn':
        return <MTNModal {...props} />;
      case 'airtel':
        return <AirtelModal {...props} />;
      case 'startimes':
        return <StarTimesModal {...props} />;
      case 'irembo':
        return <IremboModal {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>💳 DDIN Payment Hub</h1>
        <p>Fast, secure payments for Rwanda</p>
        {user && (
          <div className="user-info">
            <span>👤 {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <p>{notification.message}</p>
          <button onClick={() => setNotification(null)}>×</button>
        </div>
      )}

      {loading && <div className="loading">Loading services...</div>}

      {!loading && services.length > 0 && (
        <div className="services-container">
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.code}
                service={service}
                onClick={() => handleCardClick(service)}
              />
            ))}
          </div>
        </div>
      )}

      {showLoginModal && selectedService && (
        <LoginModal
          service={selectedService}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showPaymentModal && selectedService && user && getModalComponent()}

      <footer className="dashboard-footer">
        <p>🔒 Secure payments | Powered by DDIN Rwanda</p>
      </footer>
    </div>
  );
};

export default Dashboard;