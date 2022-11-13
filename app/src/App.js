import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Box from '@mui/material/Box';

import Calculator from './calculator';
import Report from './report';
import AppBar from "./components/AppBar";

export const initialCarbonParameters = {
  electricity: {},
  heating: {},
  transportation: {},
  emissions: {},
}

const App = () => {
  const [carbonParameters, setCarbonParameters] = useState({...initialCarbonParameters});

  return (
    <Box>
      <AppBar parameters={carbonParameters} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calculator parameters={carbonParameters} setParameters={setCarbonParameters} />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
