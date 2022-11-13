const {
  POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER,
  TOTAL_OUTPUT_EF_CH4_BY_GRID,
  TOTAL_OUTPUT_EF_CO2_BY_GRID,
  TOTAL_OUTPUT_EF_N2O_BY_GRID,
} = require('../constants');

const {
  convertPoundsPerMWhToKilogramsPerkWh,
  calculateGridCH4Emission,
  calculateGridCO2Emission,
  calculateGridN2OEmission,
  calculateGridTotalEmissionInYear,
} = require('../index');

const {
  convertCH4ToCO2e,
  convertN2OToCO2e,
} = require('../../utils');

const assert = require('chai').assert;

describe('Electricity Formulas', () => {

  describe('convertPoundsPerMWhToKilogramsPerkWh', () => {
    it('should convert lb/MWh to kg/hWh properly', () => {
      const mockConsumptionInLbPerMWh = 10;
      const expectedConversion = mockConsumptionInLbPerMWh * POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER;

      assert.equal(convertPoundsPerMWhToKilogramsPerkWh(mockConsumptionInLbPerMWh), expectedConversion);
    });
  });

  describe('calculateGridCH4Emission', () => {
    it('should calculate grid CH4 emissions properly', () => {
      const mockConsumptionInkWh = 10;
      const mockGrid = 'CAMX';
      const mockGridEF = TOTAL_OUTPUT_EF_CH4_BY_GRID[mockGrid] * POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER;

      const expected = mockConsumptionInkWh * mockGridEF;
      assert.equal(calculateGridCH4Emission(mockConsumptionInkWh, mockGrid), expected);
    });
  });

  describe('calculateGridCO2Emission', () => {
    it('should calculate grid CO2 emissions properly', () => {
      const mockConsumptionInkWh = 10;
      const mockGrid = 'CAMX';
      const mockGridEF = TOTAL_OUTPUT_EF_CO2_BY_GRID[mockGrid] * POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER;

      const expected = mockConsumptionInkWh * mockGridEF;
      assert.equal(calculateGridCO2Emission(mockConsumptionInkWh, mockGrid), expected);
    });
  });


  describe('calculateGridN2OEmission', () => {
    it('should calculate grid N2O emissions properly', () => {
      const mockConsumptionInkWh = 10;
      const mockGrid = 'CAMX';
      const mockGridEF = TOTAL_OUTPUT_EF_N2O_BY_GRID[mockGrid] * POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER;

      const expected = mockConsumptionInkWh * mockGridEF;
      assert.equal(calculateGridN2OEmission(mockConsumptionInkWh, mockGrid), expected);
    });
  });


  describe('calculateGridTotalEmissionInYear', () => {
    it('should calculate grid total emissions properly', () => {
      const mockConsumptionInkWh = 10;
      const mockGrid = 'CAMX';

      const totalCO2 = mockConsumptionInkWh * TOTAL_OUTPUT_EF_CO2_BY_GRID[mockGrid] * POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER;
      const totalCH4 = mockConsumptionInkWh * TOTAL_OUTPUT_EF_CH4_BY_GRID[mockGrid] * POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER;
      const totalN2O = mockConsumptionInkWh * TOTAL_OUTPUT_EF_N2O_BY_GRID[mockGrid] * POUND_PER_MWH_TO_KILOGRAM_PER_KWH_MULTIPLIER;

      const expectedTotal = (totalCO2 + convertCH4ToCO2e(totalCH4) + convertN2OToCO2e(totalN2O)) * 12;

      assert.equal(calculateGridTotalEmissionInYear(mockConsumptionInkWh, mockGrid), expectedTotal);
    });
  });

});
