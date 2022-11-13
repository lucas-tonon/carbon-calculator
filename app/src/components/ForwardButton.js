import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

const ForwardButton = ({ nextUrl }) => {
  const navigate = useNavigate();

  const onGoForward = () => {
    navigate(nextUrl);
  }

  return (
    <Button onClick={onGoForward}>Next</Button>
  );
};

export default ForwardButton;
