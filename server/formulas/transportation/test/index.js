const {
  MOBILE_COMBUSTION_EMISSIONS_PER_GALLON,
  PASSENGER_CAR_CH4_FACTOR_PER_MILE_BY_YEAR,
  PASSENGER_CAR_N2O_FACTOR_PER_MILE_BY_YEAR
} = require('../constants');

const {
  transformVehicleYear,
  calculateMobileCombustionCO2Emission,
  calculateMobileCombustionCH4Emission,
  calculateMobileCombustionN2OEmission,
  calculateTotalMobileCombustionEmission,
} = require('../index');

const {
  convertCH4ToCO2e,
  convertN2OToCO2e,
} = require('../../utils');

const assert = require('chai').assert;

describe('Transportation Formulas', () => {

  describe('transformVehicleYear', () => {
    it('should transform vehicle year correctly when vehicle year < minYear', () => {
      const mockVehicleYear = 1998;
      const mockOptions = [1999];

      const expected = 1999;

      assert.equal(transformVehicleYear(mockVehicleYear, mockOptions), expected);
    });

    it('should transform vehicle year correctly when vehicle year > maxYear', () => {
      const mockVehicleYear = 2000;
      const mockOptions = [1999];

      const expected = 1999;

      assert.equal(transformVehicleYear(mockVehicleYear, mockOptions), expected);
    });


    it('should simply return vehicle year when vehicle year within options range', () => {
      const mockVehicleYear = 2000;
      const mockOptions = [1998, 1999, 2000, 2001, 2002];

      const expected = 2000;

      assert.equal(transformVehicleYear(mockVehicleYear, mockOptions), expected);
    });
  });

  describe('calculateMobileCombustionCO2Emission', () => {
    it('should calculate mobile combustion CO2 emissions properly', () => {
      const mockGallons = 10;
      const mockCombustionType = 'ETHANOL';

      const expected = mockGallons * MOBILE_COMBUSTION_EMISSIONS_PER_GALLON[mockCombustionType];

      assert(calculateMobileCombustionCO2Emission(mockGallons, mockCombustionType), expected);
    });
  });

  describe('calculateMobileCombustionCH4Emission', () => {
    it('should calculate mobile combustion CH4 emissions properly', () => {
      const mockMiles = 1000;
      const mockVehicleYear = 2000;

      const emissionFactorInKgPerMile = PASSENGER_CAR_CH4_FACTOR_PER_MILE_BY_YEAR[mockVehicleYear] / 1000;
      const expected = mockMiles * emissionFactorInKgPerMile;

      assert(calculateMobileCombustionCH4Emission(mockMiles, mockVehicleYear), expected);
    });
  });

  describe('calculateMobileCombustionN2OEmission', () => {
    it('should calculate mobile combustion N2O emissions properly', () => {
      const mockMiles = 1000;
      const mockVehicleYear = 2000;

      const emissionFactorInKgPerMile = PASSENGER_CAR_N2O_FACTOR_PER_MILE_BY_YEAR[mockVehicleYear] / 1000;
      const expected = mockMiles * emissionFactorInKgPerMile;

      assert(calculateMobileCombustionCH4Emission(mockMiles, mockVehicleYear), expected);
    });
  });

  describe('calculateTotalMobileCombustionEmission', () => {
    it('should calculate mobile combustion total emissions properly', () => {
      const mockMiles = 100;
      const mockGasMileage = 10;
      const mockVehicleYear = 2000;
      const mockCombustionType = 'ETHANOL';

      const mockGallons = mockMiles / mockGasMileage;

      const totalCO2 = mockGallons * MOBILE_COMBUSTION_EMISSIONS_PER_GALLON[mockCombustionType];

      const totalCH4 = mockMiles * PASSENGER_CAR_CH4_FACTOR_PER_MILE_BY_YEAR[mockVehicleYear] / 1000;
      const totalN2O = mockMiles * PASSENGER_CAR_N2O_FACTOR_PER_MILE_BY_YEAR[mockVehicleYear] / 1000;

      const expected = totalCO2 + convertCH4ToCO2e(totalCH4) + convertN2OToCO2e(totalN2O);

      assert(calculateTotalMobileCombustionEmission(mockMiles, mockGasMileage, mockVehicleYear, mockCombustionType), expected);
    });
  });

});
