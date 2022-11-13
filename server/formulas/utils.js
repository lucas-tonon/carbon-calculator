const METHANE_CO2_EQUIVALENT_MULTIPLIER = 25;
const NITROUS_OXIDE_CO2_EQUIVALENT_MULTIPLIER = 298;

const convertCH4ToCO2e = (methane) => methane * METHANE_CO2_EQUIVALENT_MULTIPLIER;

const convertN2OToCO2e = (nitrousOxide) => nitrousOxide * NITROUS_OXIDE_CO2_EQUIVALENT_MULTIPLIER;

module.exports = {
  convertCH4ToCO2e,
  convertN2OToCO2e,
};
