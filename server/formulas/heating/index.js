const {
  convertCH4ToCO2e,
  convertN2OToCO2e,
} = require('../utils');

const {
CO2_EMISSION_FACTOR_PER_GALLON,
CH4_EMISSION_FACTOR_PER_GALLON,
N2O_EMISSION_FACTOR_PER_GALLON,
} = require('./constants');

/**
 *
 * @param {Number} gallons Gallons consumed in heating per month
 * @param {String} heatingType Type of heating fuel used
 * @returns The total emission of CO2 per month, in kg
 */
const calculateHeatingCO2Emission = (gallons, heatingType) => {
  const emissionFactorInKgPerGallon = CO2_EMISSION_FACTOR_PER_GALLON[heatingType];

  return gallons * emissionFactorInKgPerGallon;
};

/**
 *
 * @param {Number} gallons Gallons consumed in heating per month
 * @param {String} heatingType Type of heating fuel used
 * @returns The total emission of CH4 per month, in kg
 */
const calculateHeatingCH4Emission = (gallons, heatingType) => {
  const emissionFactorInGramsPerGallon = CH4_EMISSION_FACTOR_PER_GALLON[heatingType];
  const emissionFactorInKgPerGallon = emissionFactorInGramsPerGallon / 1000;

  return gallons * emissionFactorInKgPerGallon;
};

/**
 *
 * @param {Number} gallons Gallons consumed in heating per month
 * @param {String} heatingType Type of heating fuel used
 * @returns The total emission of N2O per month, in kg
 */
const calculateHeatingN2OEmission = (gallons, heatingType) => {
  const emissionFactorInGramsPerGallon = N2O_EMISSION_FACTOR_PER_GALLON[heatingType];
  const emissionFactorInKgPerGallon = emissionFactorInGramsPerGallon / 1000;

  return gallons * emissionFactorInKgPerGallon;
};

/**
 *
 * @param {Number} gallons Gallons consumed in heating per month
 * @param {String} heatingType Type of heating fuel used
 * @returns Returns the total emission of CO2 per year, in kg
 */
const calculateHeatingTotalEmissionsInYear = (gallons, heatingType) => {
  let totalCO2InMonth = calculateHeatingCO2Emission(gallons, heatingType);

  const totalCH4InMonth = calculateHeatingCH4Emission(gallons, heatingType);
  totalCO2InMonth += convertCH4ToCO2e(totalCH4InMonth);

  const totalN2OInMonth = calculateHeatingN2OEmission(gallons, heatingType);
  totalCO2InMonth += convertN2OToCO2e(totalN2OInMonth);

  const totalCO2InYear = totalCO2InMonth * 12;

  return totalCO2InYear;
};

module.exports = {
  calculateHeatingCO2Emission,
  calculateHeatingCH4Emission,
  calculateHeatingN2OEmission,
  calculateHeatingTotalEmissionsInYear,
};
