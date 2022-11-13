import React from 'react';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { sanitizeFloatInput } from './utils';

const ElectricityForm = ({ parameters, setParameters }) => {
  const [consumption, setConsumption] = React.useState();
  const [selectedGridOption, setSelectedGridOption] = React.useState();
  const [gridOptions, setGridOptions] = React.useState({});

  React.useEffect(() => {
    fetch('/api/v1/electricity/options')
      .then((res) => res.json())
      .then((data) => setGridOptions(data));
  }, [gridOptions]);

  React.useEffect(() => {
    const currentEmissions = parameters.emissions;

    if (selectedGridOption === undefined) {
      setParameters({ ...parameters, emissions: {...currentEmissions, electricity: 0 }});
      return;
    }

    const consumptionInput = consumption || 0;
    fetch(`/api/v1/electricity/calculate?consumption=${consumptionInput}&grid=${selectedGridOption}`)
      .then((res) => res.json())
      .then((data) => setParameters({ ...parameters, emissions: { ...currentEmissions, electricity: data.totalEmissions }}));
  }, [consumption, selectedGridOption]);

  const handleSelectedGridOptionChange = (e) => {
    setSelectedGridOption(e.target.value);
    setParameters({ ...parameters, electricity: { ...parameters.electricity, gridOption: e.target.value } })
  };

  const handleConsumptionChange = (e) => {
    const sanitizedInput = sanitizeFloatInput(e.target.value);
    setConsumption(sanitizedInput);
    setParameters({ ...parameters, electricity: { ...parameters.electricity, consumption: sanitizedInput } })
  };

  return (
    <Box minHeight='450px' sx={{ '& > :not(style)': { m: 1 } }} display='flex' flexDirection='column'>
      <Typography>
        Enter your average monthly electricity consumption in kWh and the electricity grid used.
      </Typography>

      <FormControl>
        <TextField
          label='Electricity Consumption'
          value={consumption}
          onChange={handleConsumptionChange}
          inputProps={{ maxLength: 13 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Grid Location</InputLabel>
        <Select
          label='Grid Location'
          onChange={handleSelectedGridOptionChange}
          value={selectedGridOption}
        >
          {
            gridOptions && Object.entries(gridOptions).map(entry =>
              <MenuItem key={entry[1]} value={entry[1]}>{entry[0]}</MenuItem>
            )
          }
        </Select>
      </FormControl>
    </Box>
  );
};

export default ElectricityForm;