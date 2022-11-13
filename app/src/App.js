import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home';
import Calculator from './calculator';
import Report from './report';

export const initialCarbonParameters = {
  electricity: {},
  heating: {},
  transportation: {},
  emissions: {},
}

const App = () => {
  const [carbonParameters, setCarbonParameters] = React.useState({...initialCarbonParameters});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home parameters={carbonParameters} setParameters={setCarbonParameters} />} />
        <Route path="/calculator" element={<Calculator parameters={carbonParameters} setParameters={setCarbonParameters} />} />
        <Route path="/report" element={<Report parameters={carbonParameters} setParameters={setCarbonParameters} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
