const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    locationName: String,
    description: String,
    lattitude: String,
    longitude: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Location', LocationSchema);