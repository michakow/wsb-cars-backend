const express = require('express');

const CarsController = require('../controllers/cars');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();

router.get('/', CarsController.getCars);
router.get('/:id', CarsController.getCarById);
router.post('/', checkAuth, CarsController.addCar);
router.put('/:id', checkAuth, CarsController.updateCar);
router.delete('/:id', checkAuth, CarsController.deleteCar);

module.exports = router;
