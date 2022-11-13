import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

const BackButton = () => {
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  }

  return (
    <Button onClick={onGoBack}>Back</Button>
  );
};

export default BackButton;
