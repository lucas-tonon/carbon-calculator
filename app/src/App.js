import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import Home from './home';
import Calculator from './calculator';
import Report from './report';
import AppBar from "./components/AppBar";
import theme from "./theme";

export const initialCarbonParameters = {
  electricity: {},
  heating: {},
  transportation: {},
  emissions: {
    electricity: 0,
    heating: 0,
    transportation: 0,
  },
}

const App = () => {
  const [carbonParameters, setCarbonParameters] = useState({...initialCarbonParameters});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height='100vh' width='100vw'>
        <AppBar parameters={carbonParameters} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator parameters={carbonParameters} setParameters={setCarbonParameters} />} />
            <Route path="/report" element={<Report parameters={carbonParameters} setParameters={setCarbonParameters} />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
