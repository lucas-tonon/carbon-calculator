import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import PageContainer from '../components/PageContainer';
import CardContentContainer from '../components/CardContentContainer';
import CardActionsContainer from '../components/CardActionsContainer';

import { initialCarbonParameters } from '../App';
import PageTitle from '../components/PageTitle';
import ReportTable from './ReportTable';

const Report = ({ parameters, setParameters }) => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleStartOver = () => {
    setParameters({...initialCarbonParameters});
    navigate('/');
  };

  return (
    <PageContainer>
      <CardContentContainer>
        <PageTitle>Report</PageTitle>
        <ReportTable parameters={parameters} />
      </CardContentContainer>

      <CardActionsContainer>
        <Box display='flex' width='100%' m={1} justifyContent='space-between'>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleNavigateBack}
            data-testid='navigate-back'
          >
            Back
          </Button>

          <Button
            variant='contained'
            onClick={handleStartOver}
            data-testid='start-over'
          >
            Start Over
          </Button>
        </Box>
      </CardActionsContainer>
    </PageContainer>
  );
};

export default Report;
