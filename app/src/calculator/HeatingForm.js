import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { grey } from '@mui/material/colors';

import { sanitizeFloatInput } from './utils';

import { calculateHeatingEmissions } from '../api';

const HeatingForm = ({ parameters, setParameters, fuelOptions }) => {
  const [gallons, setGallons] = useState(parameters.heating.gallons || '');
  const [selectedFuelOption, setSelectedFuelOption] = useState(parameters.heating.fuelOption || '');

  useEffect(() => {
    if (Object.keys(parameters.heating).length) return;

    setGallons('');
    setSelectedFuelOption('');
  }, [parameters.heating]);

  useEffect(() => {
    if (gallons === '' || selectedFuelOption === '') return;

    const currentEmissions = parameters.emissions;

    if (!selectedFuelOption) {
      setParameters({ ...parameters, emissions: { ...currentEmissions, heating: 0 }});
      return;
    }

    calculateHeatingEmissions(gallons, selectedFuelOption)
        .then((data) => setParameters({ ...parameters, emissions: {...currentEmissions, heating: data.totalEmissions }}));
  }, [gallons, selectedFuelOption]);

  const handleSelectedFuelOptionChange = (e) => {
    setSelectedFuelOption(e.target.value);
    setParameters({ ...parameters, heating: { ...parameters.heating, fuelOption: e.target.value } })
  };

  const handleGallonsChange = (e) => {
    const sanitizedInput = sanitizeFloatInput(e.target.value) || 0;
    setGallons(sanitizedInput);
    setParameters({ ...parameters, heating: { ...parameters.heating, gallons: sanitizedInput } })
  };

  return (
    <Box display='flex' flexDirection='column'>
      <Typography mx={2} mt={2}>
        The calculation for heating fuel emissions uses the average number of gallons consumed heating a household per month,
        and with this we can calculate the total amount of CO2, N2O, and CH4 emitted in a year.
      </Typography>
      <Typography mx={2}>
        We convert the N2O and CH4 emissions to COe, i.e., the carbon dioxide equivalent.
      </Typography>

      <Typography mx={2} mt={4}>
        Please insert your average monthly consumption of heating fuel in gallons, and the fuel type used.
      </Typography>

      <Box display='flex' flexDirection='column' mx={2} mt={1} sx={{ '& > :not(style)': { mb: 2 } }}>
        <TextField
          label='Heating Consumption'
          value={gallons}
          onChange={handleGallonsChange}
          inputProps={{ maxLength: 7 }}
          InputLabelProps={{
            style: { color: grey[500] }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">gallons</InputAdornment>,
          }}
        />

        <Select
          displayEmpty
          onChange={handleSelectedFuelOptionChange}
          value={selectedFuelOption}
        >
          <MenuItem key='empty-fuel' value='' disabled>
            <Typography sx={{ color: 'gray' }}>Heating Fuel</Typography>
          </MenuItem>
          {
            fuelOptions && Object.entries(fuelOptions).map(entry =>
              <MenuItem key={entry[1]} value={entry[1]}>{entry[0]}</MenuItem>
            )
          }
        </Select>
      </Box>
    </Box>
  );
};

export default HeatingForm;
