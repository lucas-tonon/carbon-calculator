import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { grey } from '@mui/material/colors';

import { sanitizeFloatInput } from './utils';
import { calculateTransportationEmissions } from '../api';

const TransportationForm = ({ parameters, setParameters, combustionOptions, vehicleYearOptions }) => {
  const [miles, setMiles] = useState(parameters.transportation.miles || '');
  const [gasMileage, setGasMileage] = useState(parameters.transportation.gasMileage || '');
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
    if (miles === '' || gasMileage === '' || selectedVehicleYearOption === '' || selectedCombustionOption === '') return;

    const currentEmissions = parameters.emissions;

    if (!selectedCombustionOption || !selectedVehicleYearOption) {
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
    const sanitizedInput = sanitizeFloatInput(e.target.value) || 0;
    setMiles(sanitizedInput);
    setParameters({ ...parameters, transportation: { ...parameters.transportation, miles: sanitizedInput } })
  };

  const handleGasMileageChange = (e) => {
    const sanitizedInput = sanitizeFloatInput(e.target.value) || 0;
    setGasMileage(sanitizedInput);
    setParameters({ ...parameters, transportation: { ...parameters.transportation, gasMileage: sanitizedInput } })
  };

  return (
    <Box display='flex' flexDirection='column' data-testid='transportation-form'>
      <Typography mx={2} mt={2}>
        The calculation for transportation emissions assumes a passenger vehicle, and uses the information of how many miles were driven in a given
        year, miles per gallon, vehicle year, and fuel type to calculate total amount of CO2, N2O, and CH4 emitted in a year.
      </Typography>
      <Typography mx={2}>
        We convert the N2O and CH4 emissions to COe, i.e., the carbon dioxide equivalent.
      </Typography>

      <Typography mx={2} mt={1}>
        If a vehicle manufacturing year is outside the range provided, the calculator will assume the closest reference value.
        For example, if a vehicle was manufactured in 1980 and the minimum option is 1988, we will use the emission factor as if it was manufactured in 1988.
      </Typography>

      <Typography mx={2} mt={1}>
        Please insert how many miles you have driven, gas mileage, vehicle year, and fuel used.
      </Typography>

      <Box display='flex' flexDirection='column' mx={2} mt={1} sx={{ '& > :not(style)': { mb: 2 } }}>
        <TextField
          label='Miles Driven'
          value={miles}
          onChange={handleMilesChange}
          inputProps={{ maxLength: 7, 'data-testid': 'miles-input' }}
          InputLabelProps={{
            style: { color: grey[500] }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">miles</InputAdornment>,
          }}
        />

        <TextField
          label='Average Gas Mileage'
          value={gasMileage}
          onChange={handleGasMileageChange}
          inputProps={{ maxLength: 3, 'data-testid': 'gas-mileage-input' }}
          InputLabelProps={{
            style: { color: grey[500] }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">miles per gallon</InputAdornment>,
          }}
        />

        <Select
          displayEmpty
          onChange={handleSelectedVehicleYearOptionChange}
          value={selectedVehicleYearOption}
          inputProps={{ 'data-testid': 'vehicle-year-select' }}
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

        <Select
          displayEmpty
          onChange={handleSelectedCombustionOptionChange}
          value={selectedCombustionOption}
          inputProps={{ 'data-testid': 'combustion-fuel-select' }}
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
      </Box>
    </Box>
  );
};

export default TransportationForm;
