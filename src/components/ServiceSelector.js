import React, { useState } from 'react';
import { 
  Card, CardContent, Typography, Button, TextField, 
  Select, MenuItem, FormControl, InputLabel, Alert 
} from '@mui/material';
import axios from 'axios';

const SERVICES = [
  { id: 'ELECTRICITY', label: 'Buy Electricity Token', fields: ['meterNumber'] },
  { id: 'RRA', label: 'Pay RRA Tax', fields: ['rraReference'] },
  { id: 'AIRTIME', label: 'Buy Airtime', fields: ['phoneNumber'] }
];

const ServiceSelector = ({ user, onPaymentSuccess }) => {
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [transactionRef, setTransactionRef] = useState(null);

  const handlePayment = async () => {
    if (!service || !amount) {
      setStatus({ type: 'error', message: 'Please select service and enter amount' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/services/pay`,
        { service, amount: parseFloat(amount), metadata },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setTransactionRef(response.data.transactionRef);
      setStatus({ 
        type: 'info', 
        message: 'Check your phone for MoMo payment prompt' 
      });

      // Start polling for status
      pollStatus(response.data.transactionRef);

    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Payment failed' 
      });
    } finally {
      setLoading(false);
    }
  };

  const pollStatus = async (ref) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/services/status/${ref}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        if (['SUCCESS', 'FAILED'].includes(response.data.status)) {
          clearInterval(interval);
          setStatus({
            type: response.data.status === 'SUCCESS' ? 'success' : 'error',
            message: response.data.status === 'SUCCESS' 
              ? 'Payment successful! Service processing...' 
              : 'Payment failed or cancelled'
          });
          
          if (response.data.status === 'SUCCESS') {
            onPaymentSuccess?.(response.data.transaction);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 5000); // Poll every 5 seconds

    // Stop polling after 2 minutes
    setTimeout(() => clearInterval(interval), 120000);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Select Service</Typography>
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Service</InputLabel>
          <Select
            value={service}
            onChange={(e) => setService(e.target.value)}
            label="Service"
          >
            {SERVICES.map(s => (
              <MenuItem key={s.id} value={s.id}>{s.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {service && SERVICES.find(s => s.id === service)?.fields.map(field => (
          <TextField
            key={field}
            fullWidth
            margin="normal"
            label={field.replace(/([A-Z])/g, ' $1').trim()}
            value={metadata[field] || ''}
            onChange={(e) => setMetadata({ ...metadata, [field]: e.target.value })}
          />
        ))}

        <TextField
          fullWidth
          margin="normal"
          label="Amount (RWF)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{ inputProps: { min: 100 } }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={loading || !service || !amount}
          sx={{ mt: 2 }}
        >
          {loading ? 'Processing...' : 'Pay with MoMo'}
        </Button>

        {status && (
          <Alert severity={status.type} sx={{ mt: 2 }}>
            {status.message}
          </Alert>
        )}

        {transactionRef && status?.type === 'info' && (
          <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'center' }}>
            Reference: {transactionRef}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceSelector;