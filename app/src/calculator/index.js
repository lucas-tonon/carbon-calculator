import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import PageContainer from '../components/PageContainer';
import CardContentContainer from '../components/CardContentContainer';
import CardActionsContainer from '../components/CardActionsContainer';
import PageTitle from '../components/PageTitle';

export const CATEGORY = {
  'ELECTRICITY': 'ELECTRICITY',
  'HEATING': 'HEATING',
  'TRANSPORTATION': 'TRANSPORTATION',
};

const Calculator = ({ parameters, setParameters }) => {
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

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleReset = () => {
    setParameters({...initialCarbonParameters})
  };

  const handleNavigationToReportPage = () => {
    navigate('/report');
  };

  return (
    <PageContainer>
      <CardContentContainer>
        <PageTitle>Calculator</PageTitle>

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
      </CardContentContainer>

      <CardActionsContainer>
        <Button sx={{ m: 1 }} variant='contained' color='secondary' onClick={handleNavigateBack}>Back</Button>

        <Box display='flex' justifyContent='flex-end' width='100%' m={1}>
          <Button sx={{ mr: 1 }} variant='contained' onClick={handleReset}>Reset</Button>
          <Button variant='contained' onClick={handleNavigationToReportPage}>Generate Report</Button>
        </Box>
      </CardActionsContainer>
    </PageContainer>
  )
};

export default Calculator;
