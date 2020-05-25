const mongoose = require('mongoose');


var Employee = mongoose.model('Employee', {
    name: { type: String},
    position: { type: String},
    office: { type: String}, 
    salary: { type: Number }
});

//const Cat = mongoose.model('Cat', { name: String });
/*var EmployeeSchema = new mongoose.Schema({
    name: { type: String },
    position : { type: String },
    office: { type:String },
    salary : { type: Number}
});
var Employee = mongoose.model('Employee', EmployeeSchema);*/
//module.exports = Employee;

//module.exports = {Employee: Employee};//es6
module.exports = { Employee }; //es6