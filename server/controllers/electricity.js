const { validationResult } = require('express-validator');

const { calculateGridTotalEmissionInYear } = require('../formulas/electricity');
const { GRID_OPTIONS } = require('../formulas/electricity/constants');

const fetchElectricityGridOptions = (req, res, next) => res.send(GRID_OPTIONS);

const calculateTotalEmission = (req, res, next) => {
  const validationsErrors = validationResult(req).errors;

  if (validationsErrors.length > 0) {
    return res.status(422).json({ errors: validationsErrors });
  }

  const { consumption, grid } = req.query;
  const totalEmissions = calculateGridTotalEmissionInYear(consumption, grid);

  res.status(200).json({ totalEmissions });
};

module.exports = {
  fetchElectricityGridOptions,
  calculateTotalEmission,
};
