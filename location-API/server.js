const express = require('express');
const bodyParser = require('body-parser'); 




// create express app
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

//parse requesrs of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//parse requesrs of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyLocations application. Take locations quickly. Organize and keep track of all your locations."});
});

// listen for requests
require('./app/routes/location.routes.js')(app);
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
   
});