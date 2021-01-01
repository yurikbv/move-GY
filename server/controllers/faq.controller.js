const Faq = require('../models/faq.model');

exports.getFaqsController = (req, res) => {
  Faq.find({}).exec((error, faqs) => {
    if(error) return res.status(400).json({error: error});
    return res.status(200).send(faqs)
  })
}

exports.getCurrentFaqController = (req, res) => {
  const faqId = req.params.faqId;
  Faq.findById({_id: faqId}).exec((error, faq) => {
    if (error ) return res.status(400).json({error:error});
    return res.status(200).json({faq});
  })
}

exports.addFaqController = (req, res) => {
  const faq = new Faq(req.body);
  faq.save((error, data) => {
    if (error ) return res.status(400).json({error: error});
    return res.status(200).json({faq});
  })
}

exports.updateFaqController = (req, res) => {
  const faqId = req.params.faqId;
  Faq.findByIdAndUpdate({_id: faqId}, req.body, {new: true}, (error, faq) => {
    if (error ) return res.status(400).json({error: error});
    return res.status(200).json({faq});
  })
}

exports.deleteFaqController = (req, res) => {
  const faqId = req.params.faqId;
  Faq.findByIdAndDelete(faqId, (error, faq) => {
    if (error ) return res.status(400).json({error: error});
    return res.status(200).json({faq});
  })
}