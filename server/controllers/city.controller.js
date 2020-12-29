const City = require('../models/city.model');

exports.getCitiesController = (req, res) => {
  City.find({}).sort('city').exec((err, cities) => {
    if (err) return res.status(400).json({error: err});
    return res.status(200).send({cities});
  })
}

exports.addCityController = (req, res) => {
  const city = new City(req.body);
  city.save(((err, doc) => {
    if (err) return res.status(400).json({error:err});
    return res.status(200).json({city: doc})
  }))
};

exports.updateCityController = (req, res) => {
  const cityId = req.params.cityId;
  City.findByIdAndUpdate(cityId, {new: true}, (error, city) => {
    if (error) res.status(400).json({error});
    return res.status(200).send({city});
  })
}

exports.deleteCityController = (req, res) => {
  const cityId = req.params.cityId;
  City.findByIdAndDelete(cityId, {new: true}, (error, city) => {
    if (error) res.status(400).json({error});
    return res.status(200).send({city});
  })
}