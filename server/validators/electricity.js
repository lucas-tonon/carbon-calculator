const { query } = require('express-validator');

const { GRID_OPTIONS } = require('../formulas/electricity/constants');
const gridOptionNames = Object.values(GRID_OPTIONS);

/**
 * consumption (float): must exist AND be a valid float in range 0 - 9999999999999
 *
 * grid (string): must exist and be a valid grid option
 */
const electricityCalculationValidator = [
  query('consumption')
    .not().isEmpty().withMessage("Electricity Consumption cannot be empty")
    .isFloat({ min: 0, max: 9999999999999 }).withMessage("Electricity Consumption must be a number between 0 and 9999999999999"),

  query('grid')
    .not().isEmpty().withMessage("Grid name cannot be empty")
    .isIn(gridOptionNames).withMessage(`Grid name must be one of: ${gridOptionNames}`),
];

module.exports = {
  electricityCalculationValidator,
};
