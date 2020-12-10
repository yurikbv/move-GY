const express = require('express');

const router = express.Router();

const {getUsersController, updateUserByAdmin, getVehiclesController, updateVehicleByAdmin, deleteUserByAdmin, 
  deleteVehicleByAdmin, getAllRoutesController, newRouteController, getRouteController, updateRouteController, deleteRouteController} 
= require('../controllers/admin.comtroller');

router.get('/admin/users', getUsersController);
router.put('/admin/users/:userId', updateUserByAdmin);
router.delete('/admin/users/:userId', deleteUserByAdmin);

router.get('/admin/vehicles', getVehiclesController);
router.put('/admin/vehicles/:vehicleId', updateVehicleByAdmin);
router.delete('/admin/vehicles/:vehicleId', deleteVehicleByAdmin);

router.post('/admin/route', newRouteController);
router.get('/admin/route/:routeId', getRouteController)
router.put('/admin/route/:routeId', updateRouteController);
router.delete('/admin/route/:routeId', deleteRouteController);

router.get('/admin/routes', getAllRoutesController);

module.exports = router;