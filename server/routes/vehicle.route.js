const express = require('express');

const router = express.Router();

const { addVehicleController,
  getVehiclesForDriverController,
  setVehicleLocationController,
  clearVehicleLocationController,
  disActiveVehiclesUser, activeVehicleController  } = require('../controllers/vehicle.controller');

router.get('/vehicles/:user_id', getVehiclesForDriverController);
router.post('/vehicle/:user_id', addVehicleController);
router.put('/vehicle/location', setVehicleLocationController);
router.put('/vehicle/clear_location', clearVehicleLocationController);
router.post('/vehicles/dis_active', disActiveVehiclesUser);
router.put('/vehicle/active/:vehicleId', activeVehicleController);

module.exports = router;
