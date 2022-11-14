import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PageTitle = ({ children }) =>
  <Box display='flex' justifyContent='center' my={2}>
    <Typography variant='h4'>{children}</Typography>
  </Box>

export default PageTitle;
