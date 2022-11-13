import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { sanitizeFloatInput } from './utils';

import { calculateHeatingEmissions } from '../api';

const HeatingForm = ({ parameters, setParameters, fuelOptions }) => {
  const [gallons, setGallons] = useState();
  const [selectedFuelOption, setSelectedFuelOption] = useState();

  useEffect(() => {
    const currentEmissions = parameters.emissions;

    if (selectedFuelOption === undefined) {
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
    const sanitizedInput = sanitizeFloatInput(e.target.value);
    setGallons(sanitizedInput);
    setParameters({ ...parameters, heating: { ...parameters.heating, gallons: sanitizedInput } })
  };

  return (
    <Box minHeight='450px' sx={{ '& > :not(style)': { m: 1 } }} display='flex' flexDirection='column'>
      <Typography>
        Enter your average monthly heating consumption in gallons used for heating, and the fuel type used.
      </Typography>

      <FormControl>
        <TextField
          label='Heating Consumption'
          value={gallons}
          onChange={handleGallonsChange}
          inputProps={{ maxLength: 7 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">gallons</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Heating Fuel Type</InputLabel>
        <Select
          label='Heating Fuel Type'
          onChange={handleSelectedFuelOptionChange}
          value={selectedFuelOption}
        >
          {
            fuelOptions && Object.entries(fuelOptions).map(entry =>
              <MenuItem key={entry[1]} value={entry[1]}>{entry[0]}</MenuItem>
            )
          }
        </Select>
      </FormControl>
    </Box>
  );
};

export default HeatingForm;
