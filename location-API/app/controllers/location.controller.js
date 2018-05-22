const Location = require('../models/location.model.js');
const validator = require('validator');

const validateInput = (location) => {
    console.log(location);
    return ((validator.trim(location.locationName).length > 0)  &&
            (validator.trim(location.description).length > 0)  &&
            (validator.isLatLong(''+ location.lattitude + ',' + location.longitude +''))
        )
    } 

// Create and Save a new Location
exports.create = (req, res) => {

 // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "location content can not be empty"
        });
    }
    if (!validateInput(req.body)) {
        return res.status(500).send({
            message: "Input data error: Please check the value/format."
        });
    }
    // Create a Location
    const location = new Location({
        locationName: req.body.locationName, 
        description: req.body.description ? req.body.description : '' ,
        lattitude: req.body.lattitude,
        longitude: req.body.longitude,
    });

    // Save Location in the database
    location.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Location."
        });
    });
};

// Retrieve and return all locations from the database.
exports.findAll = (req, res) => {

    var where_search= {};

    if(req.params) {

        var sortBy = req.params.sortBy ? req.params.sortBy : 'locationName' ; /* Name of the column name we want to sort */
        var orderBy = req.params.orderBy == 'asc' ? 1 : -1; /* Order of our sort (DESC or ASC) */
        var search = req.params.location; /* Keyword provided on our search box */
        var sort_query = {};
       
        if(req.params.location && req.params.location.length > 0) {
            sort_query[sortBy] = orderBy
 
            console.log(sort_query);
            var filter = new RegExp(search, 'i');
            where_search = {
                '$or' : [
                    {'locationName' : filter},
                    {'description' : filter},
                    {'lattitude' : filter},
                    {'longitude' : filter},
                ]
            }
        } 
    }
    Location.find(where_search).sort(sort_query)
    .then(locations => {
        res.send(locations);
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving locations."
        });
    });
};

// Find a single location with a locationId
exports.findOne = (req, res) => {

Location.findById(req.params.locationId)
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "Location not found with id " + req.params.locationId
            });            
        }
        res.send(location);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Location not found with id " + req.params.locationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving location with id " + req.params.locationId
        });
    });
};

// Update a location identified by the locationId in the request
exports.update = (req, res) => {

 // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Location content can not be empty"
        });
    }
    if (!validateInput(req.body)) {
        return res.status(500).send({
            message: "Input data error: Please check the value/format."
        });
    }
    // Find location and update it with the request body
    Location.findByIdAndUpdate(req.params.locationId, {
        locationName: req.body.locationName ,
        description: req.body.description,
        lattitude:  req.body.lattitude,
        longitude:  req.body.longitude,
    }, { new: true })
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "Location not found with id " + req.params.locationId
            });
        }
        res.send(location);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Location not found with id " + req.params.locationId
            });                
        }
        return res.status(500).send({
            message: "Error updating location with id " + req.params.locationId
        });
    });

};

// Delete a location with the specified locationId in the request
exports.delete = (req, res) => {

Location.findByIdAndRemove(req.params.locationId)
    .then(location => {
        if(!location) {
            return res.status(404).send({
                message: "Location not found with id " + req.params.locationId
            });
        }
        res.send({message: "Location deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Location not found with id " + req.params.locationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete location with id " + req.params.locationId
        });
    });

};