import React from 'react';

import CardContent from '@mui/material/CardContent';

const CardContentContainer = ({ children }) =>
  <CardContent sx={{ flex: '1 1 auto' }}>
    {children}
  </CardContent>

export default CardContentContainer;
