//Global Imports
const express = require('express');
// const bodpyParser = require('body-parser');
const cors = require('cors');

//Local Imports
const mongoose = require('./database');
var employeeController = require('./controllers/employeeController');
require('./models/employee.model');


var app = express();
app.use(express.json());
app.use(express.urlencoded(
    {
        extended: true
    }
));



app.use(cors({ origin: 'http://localhost:4200' }));

var port = 3000;
app.listen(port, () => {
    console.warn(`Server started at port: ${port}`)
}
);

app.use('/employees', employeeController);

