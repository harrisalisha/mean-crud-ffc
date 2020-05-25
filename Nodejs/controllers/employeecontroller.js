const express = require('express');
var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee.js');

//configure route to database =>localhost:3000/employee/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retrieving Employee : ' + JSON.stringify(err, undifined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send(`No record given id : ${req.params.id}`)
    }
    Employee.findById({ _id: req.params._id }, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retrieving Employee : ' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error to save new employee' + JSON.stringify(err, undefined, 2)); }
    });
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send(`No record given id : ${req.params.id}`)
    }
    //mind this is not new Employee but, but emp that we upadate
    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };
    Employee.findByIdAndUpdate({ _id: req.params.id }, { $set: emp }, { new: true },
        (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in update' + JSON.stringify(err, undefined, 2)); }
        }
    );
});


router.delete('/:id', (req, res, next) => {

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record given id : ${req.params.id}`)

    }
    //THIS SEEM DOES NOT WORK
    //note delete must include doc(which is params in body json type)
  Employee.findByIdAndRemove(req.params.id , (err, doc)=> {
        if (!err) { res.send(doc); }
        else {
          console.log('Error Employee in delete : ' + JSON.stringify(err, undifined, 2)); }
        });

    /*Employee.findByIdAndDelete(req.params.id)
        .then((list) => {
            res.status(200)
            res.send('DElETED  : ' + list)
        }, err => next(err))
        .catch(err => next(err));*/
});



module.exports = router;