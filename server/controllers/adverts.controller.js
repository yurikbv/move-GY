const Adverts = require('../models/adverts.model');

exports.getAdvertsController = (req, res) => {
  Adverts.find({}).exec((error, adverts) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).send(adverts);
  } )
};

exports.addAdvertsController = (req, res) => {
  const adverts = new Adverts(req.body);
  adverts.save((error, data) => {
    if (error) return res.status(400).json({error});
    return res.status(200).json({adverts: data});
  })
};

exports.updateAdvertsController = (req, res) => {
  let id = req.params.id;
  Adverts.findByIdAndUpdate({_id: id}, req.body, {new: true}, (error, adverts) => {
    if (error) return res.status(400).json({error});
    return res.status(200).json({adverts});
  })
}