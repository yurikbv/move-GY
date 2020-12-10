const mongoose = require('mongoose');

const advertsSchema = new mongoose.Schema({
    header_commer: {
        type: String,
        default: ''
    },
    bus_tracker: {
        type: String,
        default: ''
    },
    route_detail: {
        type: String,
        default: ''
    },
    popup: {
        type: String,
        default: ''
    },
    bus_route: {
        type: String,
        default: ''
    },
    bus_route_detail: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Adverts', advertsSchema);