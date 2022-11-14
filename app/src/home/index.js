import React from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PageContainer from '../components/PageContainer';
import CardContentContainer from '../components/CardContentContainer';
import CardActionsContainer from '../components/CardActionsContainer';
import PageTitle from '../components/PageTitle';
import Description from './Description';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToCalculator = () => {
    navigate('/calculator');
  };

  return (
    <PageContainer>
      <CardContentContainer>
        <PageTitle>What is your Carbon Footprint?</PageTitle>
        <Description />
      </CardContentContainer>

      <CardActionsContainer>
        <Box display='flex' width='100%' m={1} justifyContent='flex-end'>
          <Button variant='contained' onClick={handleNavigateToCalculator}>Start</Button>
        </Box>
      </CardActionsContainer>
    </PageContainer>
  );
};

export default Home;
