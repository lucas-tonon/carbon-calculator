import React from 'react';

import Box from '@mui/material/Box';
import MUIAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBar = ({ parameters }) => {

  const calculateEmissionsTotal = () => {
    const emissions = parameters.emissions;

    const electricityEmissions = emissions.electricity || 0;
    const heatingEmissions = emissions.heating || 0;
    const transportationEmissions = emissions.transportation || 0;

    const total = electricityEmissions + heatingEmissions + transportationEmissions;

    return total.toFixed(2);
  };

  const totalEmissions = calculateEmissionsTotal();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MUIAppBar>
        <Toolbar>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>Carbon Footprint Calculator</Typography>

          <Box display='flex' flexDirection='column' height='10%'>
            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>Estimated Total Emissions</Typography>
            <Typography variant='subtitle1' align='right'>{totalEmissions} kg of CO2 per year</Typography>
          </Box>
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
};

export default AppBar;
