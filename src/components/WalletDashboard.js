import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const WalletDashboard = ({ wallet }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>My E-Wallet</Typography>
        
        <Typography variant="h4" color="primary" gutterBottom>
          {wallet.balance.toLocaleString()} RWF
        </Typography>
        
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Available Balance
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
        <List dense>
          {wallet.transactions.slice(-5).reverse().map(txn => (
            <ListItem key={txn._id}>
              <ListItemText
                primary={`${txn.service}: ${txn.amount.toLocaleString()} RWF`}
                secondary={`${new Date(txn.createdAt).toLocaleDateString()} • ${txn.status}`}
                primaryTypographyProps={{ 
                  color: txn.type === 'CREDIT' ? 'success.main' : 'error.main' 
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default WalletDashboard;