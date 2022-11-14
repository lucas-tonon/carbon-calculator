import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

const PageContainer = ({ children }) =>
  <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%' width='100%' data-testid=' page-container'>
    <Card sx={{ height: '80%', width: '80%', maxWidth: 800, backgroundColor: '#37474f' }}>
      <Box display='flex' flexDirection='column' height='100%' overflow='auto'>
        {children}
      </Box>
    </Card>
  </Box>

export default PageContainer;
