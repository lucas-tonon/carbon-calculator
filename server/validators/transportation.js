const { query } = require('express-validator');

const { MOBILE_COMBUSTION_OPTIONS } = require('../formulas/transportation/constants');
const combustionTypeNames = Object.values(MOBILE_COMBUSTION_OPTIONS);

/**
 * miles (float): must exist AND be in range 0 - 9999999
 *
 * gasMileage (float): must exist AND be greater than 0, and max must be 999
 *
 * vehicleYear (int): must exist AND be in range 1900 - 2030
 * (end greater than current year to avoid necessity of changing in the near future)
 *
 * combustion (string): must exist AND be a valid combustion fuel type
 */
const transportationCalculationValidator = [
  query('miles')
    .not().isEmpty().withMessage("Miles driven per year cannot be empty")
    .isFloat({ min: 0, max: 9999999 }).withMessage("Miles driven must be a number between 0 and 9999999"),

  query('gasMileage')
    .not().isEmpty().withMessage("Gas Mileage cannot be empty")
    .isFloat({ gt: 0, max: 999 }).withMessage("Gas Mileage must be a number between 0 and 999"),

  query('vehicleYear')
    .not().isEmpty().withMessage("Year of the Vehicle cannot be empty")
    .isInt({ min: 1900, max: 2030 }).withMessage("Year of the Vehicle must be a number between 1900 and 2030"),

  query('combustion')
    .not().isEmpty().withMessage("Combustion Type cannot be empty")
    .isIn(combustionTypeNames).withMessage(`Combustion Type must be one of: ${combustionTypeNames}`),
];

module.exports = {
  transportationCalculationValidator,
};
