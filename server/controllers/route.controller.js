const Route = require('../models/route.model');
const Alert = require('../models/alerts.model');

exports.getRoutesByNumberController = (req, res) => {
  const number = req.params.number;
  Route.find({number})
    .populate('alerts')
    .exec((error, data) => {
    if (error) return res.status(400).json({error: error});
    return res.status(200).json({routesByNumber: data})
  })
}

exports.addAlertController = (req, res) => {
  const routeId = req.body.routeId
  const alert = new Alert(req.body.alert);
  alert.save(((err, doc) => {
    if (err) return res.status(400).json({error: err});
    Route.findByIdAndUpdate(routeId, {$push: {alerts: {_id: alert._id}}}, {new: true})
      .populate('alerts').exec((error, route) => {
        if (err) return res.status(400).json({error: err});
        return res.status(200).json({route});
    })
  }))
}

exports.setStateAlertController = (req, res) => {
  const {alertId, state} = req.body;
  Alert.findByIdAndUpdate(alertId, {$set: {is_active_alert: state}}, {new: true}, ((err, doc) => {
    if (err) return res.status(400).json({error: err});
    Route.findOne({alerts: {_id: doc._id}}).populate('alerts').exec((err, route) => {
      if (err) return res.status(400).json({error: err});
      return res.status(200).json({route});
    })
  }))
}

exports.deleteAlertController = (req, res) => {
  const alertId = req.params.alertId;
  Alert.findByIdAndDelete(alertId).exec((err,alert) => {
    if (err) return res.status(400).json({error: err});
    Route.findOneAndUpdate({alerts: {_id: alert._id}}, {$pull: {alerts: alert._id}}, {new: true})
      .populate('alerts').exec((err, route) => {
      if (err) return res.status(400).json({error: err});
      return res.status(200).json({route});
    })
  })
}