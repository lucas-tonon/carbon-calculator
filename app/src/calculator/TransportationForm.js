import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { sanitizeFloatInput } from './utils';
import { calculateTransportationEmissions } from '../api';

const TransportationForm = ({ parameters, setParameters, combustionOptions, vehicleYearOptions }) => {
  const [miles, setMiles] = useState(parameters.transportation.miles);
  const [gasMileage, setGasMileage] = useState(parameters.transportation.gasMileage);
  const [selectedVehicleYearOption, setSelectedVehicleYearOption] = useState(parameters.transportation.vehicleYearOption || '');
  const [selectedCombustionOption, setSelectedCombustionOption] = useState(parameters.transportation.combustionOption || '');

  useEffect(() => {
    if (Object.keys(parameters.transportation).length) return;

    setMiles('');
    setGasMileage('');
    setSelectedVehicleYearOption('');
    setSelectedCombustionOption('');
  }, [parameters.transportation]);

  useEffect(() => {
    const currentEmissions = parameters.emissions;

    if (selectedCombustionOption === undefined) {
      setParameters({ ...parameters, emissions: {...currentEmissions, transportation: 0 }});
      return;
    }

    calculateTransportationEmissions(miles, gasMileage, selectedVehicleYearOption, selectedCombustionOption)
        .then((data) => setParameters({ ...parameters, emissions: {...currentEmissions, transportation: data.totalEmissions }}));
  }, [miles, gasMileage, selectedVehicleYearOption, selectedCombustionOption]);

  const handleSelectedCombustionOptionChange = (e) => {
    setSelectedCombustionOption(e.target.value);
    setParameters({ ...parameters, transportation: { ...parameters.transportation, combustionOption: e.target.value } })
  };

  const handleSelectedVehicleYearOptionChange = (e) => {
    setSelectedVehicleYearOption(e.target.value);
    setParameters({ ...parameters, transportation: { ...parameters.transportation, vehicleYearOption: e.target.value } })
  };

  const handleMilesChange = (e) => {
    const sanitizedInput = sanitizeFloatInput(e.target.value);
    setMiles(sanitizedInput);
    setParameters({ ...parameters, transportation: { ...parameters.transportation, miles: sanitizedInput } })
  };

  const handleGasMileageChange = (e) => {
    const sanitizedInput = sanitizeFloatInput(e.target.value);
    setGasMileage(sanitizedInput);
    setParameters({ ...parameters, transportation: { ...parameters.transportation, gasMileage: sanitizedInput } })
  };

  return (
    <Box minHeight='450px' sx={{ '& > :not(style)': { m: 1 } }} display='flex' flexDirection='column'>
      <Typography>
        Enter information about your drive history for the past year.
      </Typography>

      <FormControl>
        <TextField
          label='Miles Driven'
          value={miles}
          onChange={handleMilesChange}
          inputProps={{ maxLength: 7 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">miles</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl>
        <TextField
          label='Average Gas Mileage'
          value={gasMileage}
          onChange={handleGasMileageChange}
          inputProps={{ maxLength: 3 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">miles per gallon</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl>
        <Select
          displayEmpty
          onChange={handleSelectedVehicleYearOptionChange}
          value={selectedVehicleYearOption}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          <MenuItem key='empty-vehicle-year' value='' disabled>
            <Typography sx={{ color: 'gray' }}>Vehicle Year</Typography>
          </MenuItem>
          {
            vehicleYearOptions && Object.entries(vehicleYearOptions).sort((a, b) => a[1] - b[1]).map(entry =>
              <MenuItem key={entry[1]} value={entry[1]}>{entry[0]}</MenuItem>
            )
          }
        </Select>
      </FormControl>

      <FormControl>
        <Select
          displayEmpty
          onChange={handleSelectedCombustionOptionChange}
          value={selectedCombustionOption}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          <MenuItem key='empty-combustion' value='' disabled>
            <Typography sx={{ color: 'gray' }}>Combustion Fuel</Typography>
          </MenuItem>
          {
            combustionOptions && Object.entries(combustionOptions).map(entry =>
              <MenuItem key={entry[1]} value={entry[1]}>{entry[0]}</MenuItem>
            )
          }
        </Select>
      </FormControl>
    </Box>
  );
};

export default TransportationForm;
