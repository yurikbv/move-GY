const express = require('express');

const router = express.Router();

const { getAdvertsController, addAdvertsController, updateAdvertsController } 
  = require('../controllers/adverts.controller');

router.get('/commer', getAdvertsController);
router.post('/commer', addAdvertsController);
router.put('/commer/:id', updateAdvertsController);

module.exports = router;