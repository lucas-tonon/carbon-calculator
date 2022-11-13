// Electricity
export const fetchElectricityGridOptions = () => fetch('/api/v1/electricity/options').then((res) => res.json());
export const calculateElectricityEmissions = (consumption, gridOption) => {
  const consumptionInput = consumption || 0;

  return fetch(`/api/v1/electricity/calculate?consumption=${consumptionInput}&grid=${gridOption}`)
      .then((res) => res.json())
};

// Heating
export const fetchHeatingFuelOptions = () => fetch('/api/v1/heating/options').then((res) => res.json());
export const calculateHeatingEmissions = (gallons, fuelOption) => {
  const gallonsInput = gallons || 0;
  return fetch(`/api/v1/heating/calculate?gallons=${gallonsInput}&type=${fuelOption}`)
      .then((res) => res.json())
};

// Transportation
export const fetchTransportationFuelOptions = () => fetch('/api/v1/transportation/combustion-options').then((res) => res.json());

export const fetchTransportationVehicleYearOptions = () => fetch('/api/v1/transportation/vehicle-year-options').then((res) => res.json());
export const calculateTransportationEmissions = (miles, gasMileage, vehicleYearOption, combustionOption) => {
  const milesInput = miles || 0;
  const gasMileageInput = gasMileage || 0;

  return fetch(`/api/v1/transportation/calculate?miles=${milesInput}&gasMileage=${gasMileageInput}&vehicleYear=${vehicleYearOption}&combustion=${combustionOption}`)
      .then((res) => res.json())
}
