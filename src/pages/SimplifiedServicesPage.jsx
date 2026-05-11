import React, { useState } from 'react';
import SimpleServiceModal from './SimpleServiceModal';
import './ServicesPage.css';

/**
 * SimplifiedServicesPage Component
 * User Flow: Browse Services → Click Service → Fill Form → Pay
 */
const SimplifiedServicesPage = ({ onPaymentInitiate }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 8 Services in different categories
  const services = [
    {
      id: 'mobile-airtime',
      name: 'Mobile Airtime',
      category: 'Telecom',
      description: 'Purchase mobile airtime for MTN and Airtel',
      icon: '📱',
      color: '#FF6B35',
      price: 'From 500 RWF',
      fields: [
        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+250788123456', required: true },
        { name: 'network', label: 'Network', type: 'select', options: ['MTN Rwanda', 'Airtel Rwanda'], required: true },
        { name: 'amount', label: 'Amount (RWF)', type: 'number', placeholder: '1000', min: 500, required: true }
      ]
    },
    {
      id: 'electricity-bill',
      name: 'Electricity Bill',
      category: 'Utilities',
      description: 'Pay your household electricity bills online',
      icon: '⚡',
      color: '#4D96FF',
      price: 'Variable',
      fields: [
        { name: 'accountNumber', label: 'Account Number', type: 'text', placeholder: 'Your EWSA account', required: true },
        { name: 'amount', label: 'Amount (RWF)', type: 'number', placeholder: '10000', min: 1000, required: true }
      ]
    },
    {
      id: 'water-bill',
      name: 'Water Bill',
      category: 'Utilities',
      description: 'Pay your water utility bills securely',
      icon: '💧',
      color: '#00D9FF',
      price: 'Variable',
      fields: [
        { name: 'meterNumber', label: 'Meter Number', type: 'text', placeholder: 'Your water meter number', required: true },
        { name: 'amount', label: 'Amount (RWF)', type: 'number', placeholder: '5000', min: 500, required: true }
      ]
    },
    {
      id: 'insurance',
      name: 'Insurance Premium',
      category: 'Financial',
      description: 'Renew or pay insurance premiums online',
      icon: '🛡️',
      color: '#F72585',
      price: 'Variable',
      fields: [
        { name: 'policyNumber', label: 'Policy Number', type: 'text', placeholder: 'Your policy number', required: true },
        { name: 'insuranceType', label: 'Insurance Type', type: 'select', options: ['Auto', 'Health', 'Home', 'Life'], required: true },
        { name: 'amount', label: 'Premium Amount (RWF)', type: 'number', placeholder: '50000', min: 5000, required: true }
      ]
    },
    {
      id: 'school-fees',
      name: 'School Fees',
      category: 'Education',
      description: 'Pay school and tuition fees easily',
      icon: '🎓',
      color: '#06A77D',
      price: 'Variable',
      fields: [
        { name: 'studentName', label: 'Student Name', type: 'text', placeholder: 'Full name', required: true },
        { name: 'schoolName', label: 'School Name', type: 'text', placeholder: 'School or institution', required: true },
        { name: 'amount', label: 'Amount (RWF)', type: 'number', placeholder: '50000', min: 5000, required: true }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare Services',
      category: 'Health',
      description: 'Pay for medical services and consultations',
      icon: '🏥',
      color: '#E63946',
      price: 'Variable',
      fields: [
        { name: 'patientName', label: 'Patient Name', type: 'text', placeholder: 'Full name', required: true },
        { name: 'facility', label: 'Hospital/Clinic', type: 'text', placeholder: 'Facility name', required: true },
        { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Consultation', 'Treatment', 'Surgery', 'Lab Test'], required: true },
        { name: 'amount', label: 'Amount (RWF)', type: 'number', placeholder: '25000', min: 1000, required: true }
      ]
    },
    {
      id: 'vendor-payment',
      name: 'Vendor/Supplier Payment',
      category: 'Business',
      description: 'Pay suppliers and vendors for goods/services',
      icon: '🤝',
      color: '#A23B72',
      price: 'Custom',
      fields: [
        { name: 'vendorName', label: 'Vendor Name', type: 'text', placeholder: 'Business name', required: true },
        { name: 'phone', label: 'Vendor Phone', type: 'tel', placeholder: '+250788123456', required: true },
        { name: 'amount', label: 'Amount (RWF)', type: 'number', placeholder: '100000', min: 1000, required: true }
      ]
    },
    {
      id: 'government-services',
      name: 'Government Services',
      category: 'Government',
      description: 'Pay for permits, licenses, and govt services',
      icon: '🏛️',
      color: '#264653',
      price: 'Variable',
      fields: [
        { name: 'nidNumber', label: 'National ID Number', type: 'text', placeholder: '1 XXXXX XXXXXXX XX', required: true },
        { name: 'serviceType', label: 'Service Type', type: 'select', options: ['Passport', 'License', 'Permit', 'Certificate'], required: true },
        { name: 'amount', label: 'Amount (RWF)', type: 'number', placeholder: '15000', min: 500, required: true }
      ]
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleFormSubmit = (formData) => {
    // Combine service info with form data
    const paymentData = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      serviceCategory: selectedService.category,
      ...formData
    };

    // Send to parent component for payment
    if (onPaymentInitiate) {
      onPaymentInitiate(paymentData);
    }

    handleCloseModal();
  };

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  const categories = Object.keys(servicesByCategory).sort();

  return (
    <div className="services-page">
      {/* Header */}
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Select a service, fill the form, and pay in seconds</p>
      </div>

      {/* Services by Category */}
      <div className="services-container">
        {categories.map((category) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="services-grid">
              {servicesByCategory[category].map((service) => (
                <div
                  key={service.id}
                  className="service-card"
                  onClick={() => handleServiceClick(service)}
                  style={{ '--service-color': service.color }}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                  <p className="service-price">{service.price}</p>
                  <button className="cta-button">
                    Select Service
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for form input */}
      {selectedService && (
        <SimpleServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Info Cards */}
      <div className="services-info">
        <div className="info-card">
          <span className="info-icon">🔒</span>
          <h4>Secure</h4>
          <p>Encrypted & safe</p>
        </div>
        <div className="info-card">
          <span className="info-icon">⚡</span>
          <h4>Fast</h4>
          <p>Instant processing</p>
        </div>
        <div className="info-card">
          <span className="info-icon">🌍</span>
          <h4>Easy</h4>
          <p>Simple 2-step process</p>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedServicesPage;
