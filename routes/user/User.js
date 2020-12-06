const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, 
    unique: true,
     trim:true },
  password: {type: String, required: true},
  appointment:{type:mongoose.Schema.ObjectId, ref:'Time'}//??????
});



module.exports = mongoose.model('User', UserSchema);