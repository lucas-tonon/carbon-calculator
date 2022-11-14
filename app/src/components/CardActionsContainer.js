import React from 'react';

import CardActions from '@mui/material/CardActions';

const CardActionsContainer = ({ children }) =>
  <CardActions sx={{ flex: '0 1 60px' }}>
    {children}
  </CardActions>

export default CardActionsContainer;
