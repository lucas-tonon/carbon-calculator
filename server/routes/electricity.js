const express = require('express');
const router = express.Router();

const { electricityCalculationValidator } = require('../validators/electricity');
const electricityController = require('../controllers/electricity');

router.get('/api/v1/electricity/options', electricityController.fetchElectricityGridOptions);
router.get('/api/v1/electricity/calculate', electricityCalculationValidator, electricityController.calculateTotalEmission);

module.exports = router;
