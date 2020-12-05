const Vehicle = require('../models/vahicle.model');
const User = require('../models/auth.model');

exports.getUsersController = (req, res) => {
  User.find({}).populate('vehicles').exec((error, users) => {
    if (error) res.status(400).json({error: error});
    res.status(200).send(users);
  })
}


exports.getVehiclesController = (req, res) => {
  Vehicle.find({}).exec((error, vehicles) => {
    if (error) res.status(400).json({error: error});
    res.status(200).send(vehicles);
  })
}

exports.updateUserByAdmin = (req, res) => {
  let userId  = req.params.userId;
  User.findByIdAndUpdate(userId, {$set: req.body}, {new: true}, (error, data) => {
    if (error) res.status(400).json({error: error});
    res.status(200).json(data)
  })
}

exports.updateVehicleByAdmin = (req, res) => {
  let vehicleId = req.params.vehicleId;
  Vehicle.findByIdAndUpdate({_id: vehicleId}, {$set: req.body}, { new: true}, (error, data) => {
    if (error) res.status(400).json({error: error});
    res.status(200).json(data);
  })
}

exports.deleteUserByAdmin = (req, res) => {
  const userId = req.params.userId;
  User.deleteOne({_id: userId}, (error, data) => {
    if (error) res.status(400).json({error: error});
    res.status(200).json(data);
  })
}

exports.deleteVehicleByAdmin = (req, res) => {
  let vehicleId = req.params.vehicleId;
  Vehicle.deleteOne({_id: vehicleId}, (error, data) => {
    if (error) res.status(400).json({error: error});
    User.updateMany({}, {$pull: { "vehicles": vehicleId }} , {new: true}, (error, users) => {
      if (error) res.status(400).json({error: error});
      res.status(200).json(users);
    })
  })
}

