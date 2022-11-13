import React from 'react';

import Box from '@mui/material/Box';
import CalculatorCard from './CalculatorCard';

const Calculator = (props) =>
  <Box height='100vh' width='100vw' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
    <CalculatorCard {...props} />
  </Box>

export default Calculator;
