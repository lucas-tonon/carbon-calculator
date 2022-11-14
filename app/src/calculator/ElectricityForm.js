import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { grey } from '@mui/material/colors';

import { sanitizeFloatInput } from './utils';

import { calculateElectricityEmissions } from '../api';

const ElectricityForm = ({ parameters, setParameters, gridOptions }) => {
  const [consumption, setConsumption] = useState(parameters.electricity.consumption || '');
  const [selectedGridOption, setSelectedGridOption] = useState(parameters.electricity.gridOption || '');

  useEffect(() => {
    if (Object.keys(parameters.electricity).length) return;

    setConsumption('');
    setSelectedGridOption('');
  }, [parameters.electricity]);

  useEffect(() => {
    if (consumption === '' || selectedGridOption === '') return;

    const currentEmissions = parameters.emissions;

    if (!selectedGridOption) {
      setParameters({ ...parameters, emissions: {...currentEmissions, electricity: 0 }});
      return;
    }

    calculateElectricityEmissions(consumption, selectedGridOption)
        .then((data) => setParameters({ ...parameters, emissions: { ...currentEmissions, electricity: data.totalEmissions }}));
  }, [consumption, selectedGridOption]);

  const handleSelectedGridOptionChange = (e) => {
    setSelectedGridOption(e.target.value);
    setParameters({ ...parameters, electricity: { ...parameters.electricity, gridOption: e.target.value } })
  };

  const handleConsumptionChange = (e) => {
    const sanitizedInput = sanitizeFloatInput(e.target.value) || 0;
    setConsumption(sanitizedInput);
    setParameters({ ...parameters, electricity: { ...parameters.electricity, consumption: sanitizedInput } })
  };

  return (
    <Box display='flex' flexDirection='column' data-testid='electricity-form'>
      <Typography mx={2} mt={2}>
        The calculation for this step takes into account the average emission per electricity grid, calculating the total amount
        of CO2, N2O, and CH4 emitted.
      </Typography>
      <Typography mx={2}>
        We convert the N2O and CH4 emissions to COe, i.e., the carbon dioxide equivalent.
      </Typography>

      <Typography mx={2} mt={4}>
        Please insert your average monthly electricity consumption, in kWh, and the electricity grid used.
      </Typography>

      <Box display='flex' flexDirection='column' mx={2} mt={1} sx={{ '& > :not(style)': { mb: 2 } }}>
        <TextField
          label='Electricity Consumption'
          value={consumption}
          onChange={handleConsumptionChange}
          inputProps={{ maxLength: 13, 'data-testid': 'consumption-input' }}
          InputLabelProps={{
            style: { color: grey[500] }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
          }}
        />

        <Select
          displayEmpty
          onChange={handleSelectedGridOptionChange}
          value={selectedGridOption}
          inputProps={{ 'data-testid': 'grid-location-select' }}
        >
          <MenuItem key='empty-grid-location' value='' disabled>
            <Typography sx={{ color: 'gray' }}>Grid Location</Typography>
          </MenuItem>
          {
            gridOptions && Object.entries(gridOptions).map(entry =>
              <MenuItem key={entry[1]} value={entry[1]}>{entry[0]}</MenuItem>
            )
          }
        </Select>
      </Box>
    </Box>
  );
};

export default ElectricityForm;
