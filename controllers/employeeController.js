const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//Local import
//Importing Model
var { Employee } = require('../models/employee.model');
var { User } = require('../models/user');

// localhost:3000/employees

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    });
})

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid Email');
            } else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    res.status(200).send(user)
                }
            }
        }
    })
});

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "expo"
        },
        {
            "_id": "2",
            "name": "expo"
        },
        {
            "_id": "3",
            "name": "expo"
        },
        {
            "_id": "4",
            "name": "expo"
        }]
        res.json(events)
});

router.get('/special', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "expo"
        },
        {
            "_id": "2",
            "name": "expo"
        },
        {
            "_id": "3",
            "name": "expo"
        },
        {
            "_id": "4",
            "name": "expo"
        }]
        res.json(events)
});

router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs) }
        else { console.warn('Error while retrieving employees: ' + JSON.stringify(err, undefined, 2)) }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc) }
        else { console.warn('Error while retrieving employees: ' + JSON.stringify(err, undefined, 2)) }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };

    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc) }
        else { console.log('Error while updating record :' + JSON.stringify(err, undefined, 2)) }
    });

});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else {  console.log('Error while deleting record :' + JSON.stringify(err, undefined, 2))}
    })
})

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc) }
        else { console.warn('Error while saving employees: ' + JSON.stringify(err, undefined, 2)) }
    });
});

module.exports = router;
