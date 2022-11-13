const express = require('express');
const router = express.Router();

const { transportationCalculationValidator } = require('../validators/transportation');
const transportationController = require('../controllers/transportation');

router.get('/api/v1/transportation/options', transportationController.fetchTransportationFuelOptions);
router.get('/api/v1/transportation/calculate', transportationCalculationValidator, transportationController.calculateTotalEmission);

module.exports = router;
