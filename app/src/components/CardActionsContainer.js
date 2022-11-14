import React from 'react';

import CardActions from '@mui/material/CardActions';

const CardActionsContainer = ({ children }) =>
  <CardActions sx={{ flex: '0 1 60px' }} data-testid='card-actions-container'>
    {children}
  </CardActions>

export default CardActionsContainer;
