import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home';
import HouseholdForm from './household';
import TransportationForm from './transportation';
import WasteForm from './waste';
import Report from './report';

function App() {
  const [carbonParameters, setCarbonParameters] = React.useState({});
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home parameters={carbonParameters} setParameters={setCarbonParameters} />} />
        <Route path="/household" element={<HouseholdForm parameters={carbonParameters} setParameters={setCarbonParameters} />} />
        <Route path="/transportation" element={<TransportationForm parameters={carbonParameters} setParameters={setCarbonParameters} />} />
        <Route path="/waste" element={<WasteForm parameters={carbonParameters} setParameters={setCarbonParameters} />} />
        <Route path="/report" element={<Report parameters={carbonParameters} setParameters={setCarbonParameters} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
