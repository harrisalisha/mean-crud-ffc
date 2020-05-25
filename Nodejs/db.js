const mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost:27017/CrudDB', 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err ) => {
    if(!err){
        console.log('mongoDb connected succesfully');
    }
    else{
        console.log('Connection err' + JSON.stringify(err, undifined, 2));
    }
});
module.exports = mongoose;