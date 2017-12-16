var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/auth');

// user schema
var UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        index : { unique: true }
    },
    password: {
        type: String,
        required: true
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getByEmail = function(email, callback){
    var query = { email : email.toLowerCase() };
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.updateUser = function(id, updatedUser, callback){
    User.findById(id, (err, user) => {
        if(err){
            throw err;
        } 
        if(user) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(updatedUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    //user.password = hash;
                    user.name = updatedUser.name;
                    user.email = updatedUser.email;
                    user.save(callback);
                });
            });
        }
    });    
}

module.exports.comparePassword = function(password, hash, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if(err) throw err;
            callback(null, isMatch);
        });
    });
}