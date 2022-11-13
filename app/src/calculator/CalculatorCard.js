import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import ElectricityForm from './ElectricityForm';
import HeatingForm from './HeatingForm';
import TransportationForm from './TransportationForm';

import {
  fetchElectricityGridOptions,
  fetchHeatingFuelOptions,
  fetchTransportationFuelOptions,
  fetchTransportationVehicleYearOptions,
} from '../api';

import { initialCarbonParameters } from '../App';

export const CATEGORY = {
  'ELECTRICITY': 'ELECTRICITY',
  'HEATING': 'HEATING',
  'TRANSPORTATION': 'TRANSPORTATION',
};

const CalculatorCard = ({ parameters, setParameters }) => {
  const navigate = useNavigate();

  const [currentCategory, setCurrentCategory] = useState(CATEGORY.ELECTRICITY);

  const [electricityGridOptions, setElectricityGridOptions] = useState({});
  const [heatingFuelOptions, setHeatingFuelOptions] = useState({});
  const [transportationFuelOptions, setTransportationFuelOptions] = useState({});
  const [transportationVehicleYearOptions, setTransportationVehicleYearOptions] = useState({});

  useEffect(() => {
    fetchElectricityGridOptions().then((data) => setElectricityGridOptions(data));
    fetchHeatingFuelOptions().then((data) => setHeatingFuelOptions(data));
    fetchTransportationFuelOptions().then((data) => setTransportationFuelOptions(data));
    fetchTransportationVehicleYearOptions().then((data) => setTransportationVehicleYearOptions(data));
  }, []);

  const handleTabChange = (e, newValue) => {
    setCurrentCategory(newValue);
  };

  const handleReset = () => {
    setParameters({...initialCarbonParameters})
  };

  const handleNavigationToReportPage = () => {
    navigate('/report');
  };

  return (
    <Box width='50%'>
      <Card>
        <CardContent>
          <Tabs value={currentCategory} onChange={handleTabChange} variant='fullWidth'>
            <Tab label='Electricity' value={CATEGORY.ELECTRICITY} />
            <Tab label='Heating' value={CATEGORY.HEATING} />
            <Tab label='Transportation' value={CATEGORY.TRANSPORTATION} />
          </Tabs>

          {
            currentCategory === CATEGORY.ELECTRICITY &&
              <ElectricityForm
                parameters={parameters}
                setParameters={setParameters}
                gridOptions={electricityGridOptions}
              />
          }

          {
            currentCategory === CATEGORY.HEATING &&
              <HeatingForm
                parameters={parameters}
                setParameters={setParameters}
                fuelOptions={heatingFuelOptions}
              />
          }

          {
            currentCategory === CATEGORY.TRANSPORTATION &&
              <TransportationForm
                parameters={parameters}
                setParameters={setParameters}
                combustionOptions={transportationFuelOptions}
                vehicleYearOptions={transportationVehicleYearOptions}
              />
          }
        </CardContent>

        <CardActions>
          <Box display='flex' width='100%' justifyContent='flex-end' sx={{ '& > :not(style)': { mx: 1, my: 2 } }}>
            <Button variant='contained' onClick={handleReset}>Reset</Button>
            <Button variant='contained' onClick={handleNavigationToReportPage}>Generate Report</Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
};

export default CalculatorCard;
