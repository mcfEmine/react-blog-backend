const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-Validator');
//----------------------------------------------------------
const UserSchema = mongoose.Schema({
   name:{
      type: String,
      require: true
   },
   email: {
      type:String,
      unique: true,
      index: true,
      require: true
   },
   username:{
      type: String,
      unique: true,
      require: true
   },
   password: {
      type: String,
      require: true
   },
   contact:{
      type: String,
      require: true
   }
});

const User= module.exports = mongoose.model('User', UserSchema);
UserSchema.plugin(uniqueValidator);
//---------------------------------------------
module.exports.getUserById = function(id, callback) {
    
    User.findById(id, callback);
}
module.exports.getUserByUserName = function(username, callback) {
    const query = {
        username: username
    }
    User.findOne(query, callback);
}
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10,(err, salt)=> {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password=hash;
            newUser.save(callback);
        });
    });
}
module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
}

 
