const { convertCH4ToCO2e, convertN2OToCO2e } = require('../utils');

const {
  MOBILE_COMBUSTION_EMISSIONS_PER_GALLON,
  PASSENGER_CAR_CH4_FACTOR_PER_MILE_BY_YEAR,
  PASSENGER_CAR_N2O_FACTOR_PER_MILE_BY_YEAR
} = require('./constants');

/**
 * Adapts vehicle year to be inside known range.
 * If lesser than min-year, uses min-year
 * If greater than max-year, uses max-year
 *
 * @param {Number} vehicleYear Year of the vehicle
 * @param {Array} possibleYears Object with options of years and the value associated with it
 * @returns The year transformed to be inside known range
 */
const transformVehicleYear = (vehicleYear, possibleYears) => {
  const minYear = Math.min(...possibleYears);
  const maxYear = Math.max(...possibleYears);

  if (vehicleYear < minYear) return minYear;
  if (vehicleYear > maxYear) return maxYear;

  return vehicleYear;
};

/**
 *
 * @param {Number} gallons Number of gallons consumed
 * @param {String} combustionType The type of fuel used
 * @returns The emission of CO2 caused by combustion of fuel, in kg
 */
const calculateMobileCombustionCO2Emission = (gallons, combustionType) => {
  return gallons * MOBILE_COMBUSTION_EMISSIONS_PER_GALLON[combustionType];
};

/**
 *
 * @param {Number} miles Miles driven in a year
 * @param {Number} vehicleYear Year of the vehicle
 * @returns The emission of CH4 caused by combustion of fuel, in kg
 */
const calculateMobileCombustionCH4Emission = (miles, vehicleYear) => {
  const possibleYears = Object.keys(PASSENGER_CAR_CH4_FACTOR_PER_MILE_BY_YEAR).map(year => Number(year));
  const fixedVehicleYear = transformVehicleYear(vehicleYear, possibleYears);

  const emissionFactorInGramsPerMile = PASSENGER_CAR_CH4_FACTOR_PER_MILE_BY_YEAR[fixedVehicleYear];
  const emissionFactorInKgPerMile = emissionFactorInGramsPerMile / 1000;

  return miles * emissionFactorInKgPerMile;
};

/**
 *
 * @param {Number} miles Miles driven in a year
 * @param {Number} vehicleYear Year of the vehicle
 * @returns The emission of N2O caused by combustion of fuel, in kg
 */
const calculateMobileCombustionN2OEmission = (miles, vehicleYear) => {
  const possibleYears = Object.keys(PASSENGER_CAR_N2O_FACTOR_PER_MILE_BY_YEAR).map(year => Number(year));
  const fixedVehicleYear = transformVehicleYear(vehicleYear, possibleYears);

  const emissionFactorInGramsPerMile = PASSENGER_CAR_N2O_FACTOR_PER_MILE_BY_YEAR[fixedVehicleYear];
  const emissionFactorInKgPerMile = emissionFactorInGramsPerMile / 1000;

  return miles * emissionFactorInKgPerMile;
};

/**
 *
 * @param {Number} miles Miles driven in a year
 * @param {Number} gasMileage Average miles per gallon
 * @param {Number} vehicleYear Year of the vehicle
 * @param {String} combustionType The type of fuel used
 * @returns The total CO2 emission in kg
 */
const calculateTotalMobileCombustionEmission = (miles, gasMileage, vehicleYear, combustionType) => {
  const gallons = miles / gasMileage;

  let totalCO2 = calculateMobileCombustionCO2Emission(gallons, combustionType);

  let totalCH4 = calculateMobileCombustionCH4Emission(miles, vehicleYear);
  totalCO2 += convertCH4ToCO2e(totalCH4);

  let totalN2O = calculateMobileCombustionN2OEmission(miles, vehicleYear);
  totalCO2 += convertN2OToCO2e(totalN2O);

  return totalCO2;
};

module.exports = {
  transformVehicleYear,
  calculateMobileCombustionCO2Emission,
  calculateMobileCombustionCH4Emission,
  calculateMobileCombustionN2OEmission,
  calculateTotalMobileCombustionEmission,
};
