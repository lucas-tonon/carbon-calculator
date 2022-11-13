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

const TransportationForm = ({ parameters, setParameters }) => {
  const [miles, setMiles] = React.useState();
  const [gasMileage, setGasMileage] = React.useState();
  const [selectedVehicleYearOption, setSelectedVehicleYearOption] = React.useState();
  const [selectedCombustionOption, setSelectedCombustionOption] = React.useState();
  const [combustionOptions, setCombustionOptions] = React.useState({});
  const [vehicleYearOptions, setVehicleYearOptions] = React.useState({});

  React.useEffect(() => {
    setMiles(parameters.transportation.miles);
    setGasMileage(parameters.transportation.gasMileage);
    setSelectedVehicleYearOption(parameters.transportation.vehicleYearOption);
    setSelectedCombustionOption(parameters.transportation.combustionOption);
  }, [parameters]);

  React.useEffect(() => {
    fetch('/api/v1/transportation/combustion-options')
      .then((res) => res.json())
      .then((data) => setCombustionOptions(data));
  }, []);

  React.useEffect(() => {
    fetch('/api/v1/transportation/vehicle-year-options')
      .then((res) => res.json())
      .then((data) => setVehicleYearOptions(data));
  }, []);

  React.useEffect(() => {
    const currentEmissions = parameters.emissions;

    if (selectedCombustionOption === undefined) {
      setParameters({ ...parameters, emissions: {...currentEmissions, transportation: 0 }});
      return;
    }

    const milesInput = miles || 0;
    const gasMileageInput = gasMileage || 0;

    fetch(`/api/v1/transportation/calculate?miles=${milesInput}&gasMileage=${gasMileageInput}&vehicleYear=${selectedVehicleYearOption}&combustion=${selectedCombustionOption}`)
      .then((res) => res.json())
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
        <InputLabel>Vehicle Year</InputLabel>
        <Select
          label='Vehicle Year'
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
          {
            vehicleYearOptions && Object.entries(vehicleYearOptions).sort((a, b) => a[1] - b[1]).map(entry =>
              <MenuItem key={entry[1]} value={entry[1]}>{entry[0]}</MenuItem>
            )
          }
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Combustion Fuel</InputLabel>
        <Select
          label='Combustion Fuel'
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
