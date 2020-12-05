const express = require('express');

const router = express.Router();

const {getUsersController, updateUserByAdmin, getVehiclesController, updateVehicleByAdmin, deleteUserByAdmin, 
  deleteVehicleByAdmin} 
= require('../controllers/admin.comtroller');

router.get('/admin/users', getUsersController);
router.put('/admin/users/:userId', updateUserByAdmin);
router.delete('/admin/users/:userId', deleteUserByAdmin);

router.get('/admin/vehicles', getVehiclesController);
router.put('/admin/vehicles/:vehicleId', updateVehicleByAdmin);
router.delete('/admin/vehicles/:vehicleId', deleteVehicleByAdmin);

module.exports = router;