import React from 'react';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { initialCarbonParameters } from '../App';

const Report = ({ parameters, setParameters }) => {
  const navigate = useNavigate();

  const onReset = () => {
    setParameters({...initialCarbonParameters});
    navigate('/');
  };

  return (
    <>
      <h1>Report</h1>
      <Button onClick={onReset}>Reset</Button>
    </>
  );
};

export default Report;
