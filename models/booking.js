var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/auth');

// Booking schema
var BookingSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
});

var Booking = module.exports = mongoose.model('Booking', BookingSchema);

module.exports.getAll = function(callback){
    Booking.find({}, callback);
}

module.exports.getById = function(id, callback){
    Booking.findById(id, callback);
}

module.exports.getByEmail = function(email, callback){
    var query = { email : email.toLowerCase() };
    Booking.findOne(query, callback);
}

module.exports.addBooking = function(newBooking, callback){
    newBooking.save(callback);
}

module.exports.validateBooking = function(newBooking, callback){
    var oldBooking;
    
    Booking.getAll((err, bookings) => {
        if(err) callback(err, null);
        
        if(!bookings) callback(null, null);

        if(bookings.length > 0){
            for(var i = 0; i < bookings.length; i++){
                // time of first timespan
                var x = bookings[i].start.getTime();
                var y = bookings[i].end.getTime();

                // time of second timespan
                var a = newBooking.start.getTime();
                var b = newBooking.end.getTime();

                if (Math.min(x, y) < Math.max(a, b) && Math.max(x, y) > Math.min(a, b)) {
                    oldBooking = bookings[i];
                    break;
                }
            }
            return callback(null, oldBooking);
        } else {
            return callback(null, null);
        }
        return callback(null, null);
    });
}