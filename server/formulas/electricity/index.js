const {
    convertCH4ToCO2e,
    convertN2OToCO2e,
} = require('../utils');

const {
  POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER,
  TOTAL_OUTPUT_EF_CH4_BY_GRID,
  TOTAL_OUTPUT_EF_CO2_BY_GRID,
  TOTAL_OUTPUT_EF_N2O_BY_GRID,
} = require('./constants');

const convertPoundsPerMWhToKilogramsPerkWh = (lbPerMwh) => lbPerMwh * POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER;

/**
 *
 * @param {*} electricityConsumption Electricity consumption in kWh
 * @param {*} grid Electricity grid name
 * @returns The total CH4 emission in kg for the given consumption
 */
const calculateGridCH4Emission = (electricityConsumption, grid) => {
  const gridEmissionFactor = TOTAL_OUTPUT_EF_CH4_BY_GRID[grid];
  const convertedEmissionFactor = convertPoundsPerMWhToKilogramsPerkWh(gridEmissionFactor);

  return electricityConsumption * convertedEmissionFactor;
};

/**
 *
 * @param {*} electricityConsumption Electricity consumption in kWh
 * @param {*} grid Electricity grid name
 * @returns The total CO2 emission in kg for the given consumption
 */
const calculateGridCO2Emission = (electricityConsumption, grid) => {
  const gridEmissionFactor = TOTAL_OUTPUT_EF_CO2_BY_GRID[grid];
  const convertedEmissionFactor = convertPoundsPerMWhToKilogramsPerkWh(gridEmissionFactor);

  return electricityConsumption * convertedEmissionFactor;
};

/**
 *
 * @param {*} electricityConsumption Electricity consumption in kWh
 * @param {*} grid Electricity grid name
 * @returns The total N2O emission in kg for the given consumption
 */
const calculateGridN2OEmission = (electricityConsumption, grid) => {
  const gridEmissionFactor = TOTAL_OUTPUT_EF_N2O_BY_GRID[grid];
  const convertedEmissionFactor = convertPoundsPerMWhToKilogramsPerkWh(gridEmissionFactor);

  return electricityConsumption * convertedEmissionFactor;
};

/**
 *
 * @param {*} electricityConsumption Electricity consumption in kWh per month
 * @param {*} grid Electricity grid name
 * @returns The total CO2 emission in kg for the entire year
 */
const calculateGridTotalEmissionInYear = (electricityConsumption, grid) => {
  let totalCO2InMonth = calculateGridCO2Emission(electricityConsumption, grid);

  const totalCH4InMonth = calculateGridCH4Emission(electricityConsumption, grid);
  totalCO2InMonth += convertCH4ToCO2e(totalCH4InMonth);

  const totalN2OInMonth = calculateGridN2OEmission(electricityConsumption, grid);
  totalCO2InMonth += convertN2OToCO2e(totalN2OInMonth);

  const totalCO2InYear = totalCO2InMonth * 12;

  return totalCO2InYear;
};

module.exports = {
  convertPoundsPerMWhToKilogramsPerkWh,
  calculateGridCH4Emission,
  calculateGridCO2Emission,
  calculateGridN2OEmission,
  calculateGridTotalEmissionInYear,
};
