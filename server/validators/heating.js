const { query } = require('express-validator');

const { HEATING_OPTIONS } = require('../formulas/heating/constants');
const heatingOptionsNames = Object.values(HEATING_OPTIONS);

/**
 * gallons (float): must exist AND be in range 0 - 9999999
 *
 * type (string): must exist AND be a valid heating fuel type
 */
const heatingCalculationValidator = [
  query('gallons')
    .not().isEmpty().withMessage("Gallons used in heating per month cannot be empty")
    .isFloat({ min: 0, max: 9999999 }).withMessage("Gallons used in heating per month must be a number between 0 and 9999999"),

  query('type')
    .not().isEmpty().withMessage("Heating Type cannot be empty")
    .isIn(heatingOptionsNames).withMessage(`Heating Type must be one of: ${heatingOptionsNames}`),
];

module.exports = {
  heatingCalculationValidator,
};
