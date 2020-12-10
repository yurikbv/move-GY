const Vehicle = require('../models/vahicle.model');
const User = require('../models/auth.model');
const Route = require('../models/route.model');

exports.getUsersController = (req, res) => {
  User.find({}).populate('vehicles').exec((error, users) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).send(users);
  })
}


exports.getVehiclesController = (req, res) => {
  Vehicle.find({}).exec((error, vehicles) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).send(vehicles);
  })
}

exports.updateUserByAdmin = (req, res) => {
  let userId  = req.params.userId;
  User.findByIdAndUpdate(userId, {$set: req.body}, {new: true}, (error, data) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({user:  data})
  })
}

exports.updateVehicleByAdmin = (req, res) => {
  let vehicleId = req.params.vehicleId;
  Vehicle.findByIdAndUpdate({_id: vehicleId}, {$set: req.body}, { new: true}, (error, data) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({vehicle: data});
  })
}

exports.deleteUserByAdmin = (req, res) => {
  const userId = req.params.userId;
  User.deleteOne({_id: userId}, (error, data) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({user: data});
  })
}

exports.deleteVehicleByAdmin = (req, res) => {
  let vehicleId = req.params.vehicleId;
  Vehicle.deleteOne({_id: vehicleId}, (error, data) => {
    if (error) return res.status(400).json({error: error});
    User.updateMany({}, {$pull: { "vehicles": vehicleId }} , {new: true}, (error, users) => {
      if (error) return res.status(400).json({error: error});
      return res.status(200).json({vehicle: data});
    })
  })
}

exports.getRouteController = (req, res) => {
  const routeId = req.params.routeId;
  Route.findById({_id: routeId}).populate('vehicles').exec((error, route) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({route});
  })
}

exports.newRouteController = (req, res) => {
  let route = new Route(req.body);
  route.save((error,data) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({route: data});
  })
}

exports.updateRouteController = (req, res) => {
  const routeId = req.params.routeId;
  Route.findByIdAndUpdate({_id: routeId}, req.body, {new: true}, (error, route) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({route});
  })
}

exports.deleteRouteController = (req, res) => {
  const routeId = req.params.routeId;
  Route.findByIdAndDelete({_id: routeId}, (error, route) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({route});
  })
}

exports.getAllRoutesController = (req, res) => {
  Route.find({}).populate('vehicles').exec((error, routes) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({routes});
  })
}


