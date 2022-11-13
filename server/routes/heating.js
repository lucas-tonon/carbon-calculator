const express = require('express');
const router = express.Router();

const { heatingCalculationValidator } = require('../validators/heating');
const heatingController = require('../controllers/heating');

router.get('/api/v1/heating/options', heatingController.fetchHeatingFuelOptions);
router.get('/api/v1/heating/calculate', heatingCalculationValidator, heatingController.calculateTotalEmission);

module.exports = router;
