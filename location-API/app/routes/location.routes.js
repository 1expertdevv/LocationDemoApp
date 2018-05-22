module.exports = (app) => {
    const locations = require('../controllers/location.controller.js');

    // Create a new location
    app.post('/places', locations.create);

    // Retrieve all locations
    app.get('/places', locations.findAll);

    app.get('/places/:sortBy/:orderBy', locations.findAll);

    app.get('/places/:location', locations.findAll);

    app.get('/places/:location/:sortBy', locations.findAll);

    app.get('/places/:location/:sortBy/:orderBy', locations.findAll);


    // Retrieve a single location with locationId
    app.get('/locations/:locationId', locations.findOne);

    // Update a location with locationId
    app.put('/locations/:locationId', locations.update);

    // Delete a location with locationId
    app.delete('/locations/:locationId', locations.delete);

}