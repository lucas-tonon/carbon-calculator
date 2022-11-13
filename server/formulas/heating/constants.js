const HEATING_OPTIONS = {
  'Fuel Oil No. 1': 'FUEL_OIL_1',
  'Fuel Oil No. 2': 'FUEL_OIL_2',
  'Fuel Oil No. 4': 'FUEL_OIL_4',
  'Kerosene': 'KEROSENE',
  'Natural Gasoline': 'NATURAL_GASOLINE',
  'Propane': 'PROPANE',
};

// kg / gallon
const CO2_EMISSION_FACTOR_PER_GALLON = {
  'FUEL_OIL_1': 10.18,
  'FUEL_OIL_2': 10.21,
  'FUEL_OIL_4': 10.96,
  'KEROSENE': 10.15,
  'NATURAL_GASOLINE': 7.36,
  'PROPANE': 5.72,
};

// g / gallon
const CH4_EMISSION_FACTOR_PER_GALLON = {
  'FUEL_OIL_1': 0.42,
  'FUEL_OIL_2': 0.41,
  'FUEL_OIL_4': 0.44,
  'KEROSENE': 0.41,
  'NATURAL_GASOLINE': 0.33,
  'PROPANE': 0.27,
};

// g / gallon
const N2O_EMISSION_FACTOR_PER_GALLON = {
  'FUEL_OIL_1': 0.08,
  'FUEL_OIL_2': 0.08,
  'FUEL_OIL_4': 0.09,
  'KEROSENE': 0.08,
  'NATURAL_GASOLINE': 0.07,
  'PROPANE': 0.05,
};

module.exports = {
  HEATING_OPTIONS,
  CO2_EMISSION_FACTOR_PER_GALLON,
  CH4_EMISSION_FACTOR_PER_GALLON,
  N2O_EMISSION_FACTOR_PER_GALLON,
};
