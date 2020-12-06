const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    appointmentTime:{type:String, 
        unique:true
    }
})


module.exports = mongoose.model('Time',timeSchema);