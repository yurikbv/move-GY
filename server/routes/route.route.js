const express = require('express');

const router = express.Router();

const {getRoutesByNumberController, addAlertController,setStateAlertController,deleteAlertController } = require('../controllers/route.controller');

router.get('/routes/:id',getRoutesByNumberController);
router.put('/routes/addAlert',addAlertController);
router.put('/routes/setStateAlert', setStateAlertController);
router.delete('/routes/deleteAlert/:alertId',deleteAlertController);

module.exports = router;