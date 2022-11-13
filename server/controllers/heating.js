const { validationResult } = require('express-validator');

const { calculateHeatingTotalEmissionsInYear } = require('../formulas/heating');
const { HEATING_OPTIONS } = require('../formulas/heating/constants');

const fetchHeatingFuelOptions = (req, res, next) => res.send(HEATING_OPTIONS);

const calculateTotalEmission = (req, res, next) => {
  const validationsErrors = validationResult(req).errors;

  if (validationsErrors.length > 0) {
    return res.status(422).json({ errors: validationsErrors });
  }

  const { gallons, type } = req.query;
  const totalEmissions = calculateHeatingTotalEmissionsInYear(gallons, type);

  res.status(200).json({ totalEmissions });
};

module.exports = {
  fetchHeatingFuelOptions,
  calculateTotalEmission,
};
