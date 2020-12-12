const Vehicle = require('../models/vahicle.model');
const User = require('../models/auth.model');

exports.addVehicleController = (req, res) => {
  const userId = req.params.user_id;
  Vehicle.findOne({plate: req.body.plate}).exec((error, vehicle) => {
    if (vehicle) return res.status(400).json({error: 'This vehicle already exists.'});
    vehicle = new Vehicle(req.body);
    vehicle.save();
    User.findOneAndUpdate({_id:userId}, {$push: {vehicles: {_id: vehicle._id}}}, {new: true, safe:true}, 
      (err, document) => {
        if (err) return res.status(400).json({error: error});
        return res.status(200).json({vehicle});
    })
  });
}

exports.getVehiclesForDriverController = (req, res) => {
  const userId = req.params.user_id;

  User.findById(userId).populate({path: 'vehicles'}).exec((error, user) => {
    if (error || !user) return res.status(400).json({error: "User not found"});
    let vehicles = user.vehicles;
    Vehicle.find({_id: { $in: vehicles}}).exec((error, data) => {
      if (error) return res.status(400).json({error: "Vehicles doesn't found"});
      return res.status(200).json({vehicles: data});
    })
  })
};

exports.disActiveVehiclesUser = (req, res) => {
  const userId = JSON.parse(req.body).id;
  User.findByIdAndUpdate(userId, { $set: {isActive: false} }, {new: true}, (error, user) => {
    if (error) return res.status(200).json({error: "Logout ERROR"});
    let vehicles = user.vehicles;
    Vehicle.updateMany({_id: { $in: vehicles}}, { $set: {isActive: false, speed: "", average_speed: []}}, {new: true},(error, vehicles) => {
      if (error) return res.status(400).json({error: "Vehicles disactive ERROR"});
      return res.status(200).send(vehicles);
    });
  })
}

exports.setVehicleLocationController = (req, res) => {
  const {id, latitude, longitude, speed} = req.body;
  Vehicle.findByIdAndUpdate(id, { $set: { latitude, longitude, speed }, 
    $push: {average_speed: speed}},
    {new: true}, (error, data) => {
      if (error) return res.status(400).json({error: error});
      return res.status(200).json({vehicle: data});
    })
}

exports.clearVehicleLocationController = (req, res) => {
  Vehicle.findByIdAndUpdate(req.body.id, { $set: { latitude: '', longitude: '', isActive: false,
    speed: "", average_speed: []}}, {new: true}, (error, data) => {
      if (error) return res.status(400).json({error: error});
      return res.status(200).json({vehicle: data});
    })
}

exports.activeVehicleController = (req,res) => {
  const vehicleId = req.params.vehicleId;
  Vehicle.findByIdAndUpdate({_id: vehicleId}, {$set: {isActive: true}}, {new: true}, (error, data) => {
    if (error) return res.status(400).json({error});
    return res.status(200).json({vehicle: data})
  })
}