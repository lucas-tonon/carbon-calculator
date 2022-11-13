const { validationResult } = require('express-validator');

const { calculateTotalMobileCombustionEmission } = require('../formulas/transportation');
const { MOBILE_COMBUSTION_OPTIONS } = require('../formulas/transportation/constants');

const fetchTransportationFuelOptions = (req, res, next) => res.send(MOBILE_COMBUSTION_OPTIONS);

const calculateTotalEmission = (req, res, next) => {
  const validationsErrors = validationResult(req).errors;

  if (validationsErrors.length > 0) {
    return res.status(422).json({ errors: validationsErrors });
  }

  const { miles, gasMileage, vehicleYear, combustion } = req.query;
  const totalEmissions = calculateTotalMobileCombustionEmission(miles, gasMileage, vehicleYear, combustion);

  res.status(200).json({ totalEmissions });
};

module.exports = {
  fetchTransportationFuelOptions,
  calculateTotalEmission,
};
