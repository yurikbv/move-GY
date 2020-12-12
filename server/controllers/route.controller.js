const Route = require('../models/route.model');

exports.getRoutesByNumberController = (req, res) => {
  const number = req.params.number;
  Route.find({number}).populate('vehicles').exec((error, data) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({routesByNumber: data})
  })
}