const express = require('express');

const router = express.Router();

const {getFaqsController, getCurrentFaqController, addFaqController, updateFaqController, deleteFaqController} = require('../controllers/faq.controller');

router.get('/faqs', getFaqsController);
router.get('/faq/:faqId', getCurrentFaqController);
router.post('/faq', addFaqController);
router.put('/faq/:faqId', updateFaqController);
router.delete('/faq/:faqId', deleteFaqController);


module.exports = router;