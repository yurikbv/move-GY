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
  User.findByIdAndDelete({_id: userId}, (error, data) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({user: data});
  })
}

exports.deleteVehicleByAdmin = (req, res) => {
  let vehicleId = req.params.vehicleId;
  Vehicle.findByIdAndDelete({_id: vehicleId}, (error, vehicle) => {
    if (error) return res.status(400).json({error: error});
    User.updateMany({}, {$pull: { "vehicles": vehicleId }} , {new: true}, (error, users) => {
      if (error) return res.status(400).json({error: error});
      return res.status(200).json({vehicle});
    })
  })
}

exports.getRouteController = (req, res) => {
  const routeId = req.params.routeId;
  Route.findById({_id: routeId}).populate('city').exec((error, route) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({route});
  })
}

exports.newRouteController = (req, res) => {
  let route = new Route(req.body);
  route.save((error,data) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).send({route: data});
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
  const cityId = req.params.cityId
  if (cityId !== 'undefined') {
    Route.find({city: cityId}).populate('city').select('_id name number activation city')
      .populate('city')
      .exec((error, routes) => {
        if (error) return res.status(400).json({error: error});
        return res.status(200).json({routes});
      })
  } else if(cityId === 'undefined' || !cityId) {
    Route.find({}).populate('city').select('_id name number activation city')
      .populate('city')
      .exec((error, routes) => {
        if (error) return res.status(400).json({error: error});
        return res.status(200).json({routes});
      })
  }
}

exports.activationUserByAdminController = (req, res) => {
  const userId = req.params.userId;
  User.findByIdAndUpdate(userId, req.body, {new: true}, (error, user) => {
    if (error) return res.status(400).json({error});
    return res.status(200).json({user});
  })
}

exports.activationVehicleByAdminController = (req, res) => {
  const vehicleId = req.params.vehicleId;
  Vehicle.findByIdAndUpdate(vehicleId, req.body, {new: true}, (error, vehicle) => {
    if (error) return res.status(400).json({error});
    return res.status(200).json({vehicle});
  })
}

exports.activationRouteByAdminController = (req, res) => {
  const routeId = req.params.routeId;
  Route.findByIdAndUpdate(routeId, req.body, {new: true}, (error, route) => {
    if (error) return res.status(400).json({error});
    return res.status(200).json({route});
  })
}

