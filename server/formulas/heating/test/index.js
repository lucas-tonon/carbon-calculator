const {
  CO2_EMISSION_FACTOR_PER_GALLON,
  CH4_EMISSION_FACTOR_PER_GALLON,
  N2O_EMISSION_FACTOR_PER_GALLON,
} = require('../constants');

const {
  calculateHeatingCO2Emission,
  calculateHeatingCH4Emission,
  calculateHeatingN2OEmission,
  calculateHeatingTotalEmissionsInYear,
} = require('../index');

const {
  convertCH4ToCO2e,
  convertN2OToCO2e,
} = require('../../utils');

const assert = require('chai').assert;

describe('Heating Formulas', () => {

  describe('calculateHeatingCO2Emission', () => {
    it('should calculate heating CO2 emissions properly', () => {
      const mockGallons = 10;
      const mockType = 'PROPANE';

      const expected = mockGallons * CO2_EMISSION_FACTOR_PER_GALLON[mockType];

      assert.equal(calculateHeatingCO2Emission(mockGallons, mockType), expected);
    });
  });

  describe('calculateHeatingCH4Emission', () => {
    it('should calculate heating CH4 emissions properly', () => {
      const mockGallons = 10;
      const mockType = 'PROPANE';

      const emissionFactor = CH4_EMISSION_FACTOR_PER_GALLON[mockType] / 1000;
      const expected = mockGallons * emissionFactor;

      assert.equal(calculateHeatingCH4Emission(mockGallons, mockType), expected);
    });
  });


  describe('calculateHeatingN2OEmission', () => {
    it('should calculate heating N2O emissions properly', () => {
      const mockGallons = 10;
      const mockType = 'PROPANE';

      const emissionFactor = N2O_EMISSION_FACTOR_PER_GALLON[mockType] / 1000;
      const expected = mockGallons * emissionFactor;

      assert.equal(calculateHeatingN2OEmission(mockGallons, mockType), expected);
    });
  });


  describe('calculateHeatingTotalEmissionsInYear', () => {
    it('should calculate heating total emissions properly', () => {
      const mockGallons = 10;
      const mockType = 'PROPANE';

      const totalCO2 = mockGallons * CO2_EMISSION_FACTOR_PER_GALLON[mockType];
      const totalCH4 = mockGallons * CH4_EMISSION_FACTOR_PER_GALLON[mockType] / 1000;
      const totalN2O = mockGallons * N2O_EMISSION_FACTOR_PER_GALLON[mockType] / 1000;

      const expectedTotal = (totalCO2 + convertCH4ToCO2e(totalCH4) + convertN2OToCO2e(totalN2O)) * 12;

      assert.equal(calculateHeatingTotalEmissionsInYear(mockGallons, mockType), expectedTotal);
    });
  });

});
