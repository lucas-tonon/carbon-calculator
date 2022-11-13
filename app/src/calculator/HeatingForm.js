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

const HeatingForm = ({ parameters, setParameters }) => {
  const [gallons, setGallons] = React.useState();
  const [selectedFuelOption, setSelectedFuelOption] = React.useState();
  const [fuelOptions, setFuelOptions] = React.useState({});

  React.useEffect(() => {
    setGallons(parameters.heating.gallons);
    setSelectedFuelOption(parameters.heating.fuelOption);
  }, [parameters]);

  React.useEffect(() => {
    fetch('/api/v1/heating/options')
      .then((res) => res.json())
      .then((data) => setFuelOptions(data));
  }, []);

  React.useEffect(() => {
    const currentEmissions = parameters.emissions;

    if (selectedFuelOption === undefined) {
      setParameters({ ...parameters, emissions: { ...currentEmissions, heating: 0 }});
      return;
    }

    const gallonsInput = gallons || 0;
    fetch(`/api/v1/heating/calculate?gallons=${gallonsInput}&type=${selectedFuelOption}`)
      .then((res) => res.json())
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
