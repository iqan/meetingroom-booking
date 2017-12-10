var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var Booking = require('../models/booking');
var config = require('../config/auth');

router.get('/', (req, res, next) => {
    Booking.getAll((err, bookings) => {
        if(err){
            res.json({ success: false, message:'something went wrong. try again.' , data: null });
        } else {
            res.json({ success: true, message:'' ,data: bookings });
        }
    });
});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var id = req.params.id;
    Booking.getById(id, (err, booking) => {
        if(err){
            res.json({ success: false, message:'something went wrong. try again.' , data: null });
        } else if(!booking){
            res.json({ success: false, message:'booking not found' , data: null });
        } else {
            res.json({ success: true, message:'' ,data: booking });
        }
    });
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var newBooking = new Booking({
        name: req.body.name,
        email: req.body.email,
        room: req.body.room,
        subject: req.body.subject,
        start: req.body.start,
        end: req.body.end
    });

    try{
        Booking.validateBooking(newBooking, (err, oldBooking) => {
            if(err){
                res.json({ success: false, message:'something went wrong. try again.' , data: null });
            } else {
                if (oldBooking){
                    res.json({ success: false, message:'time clashes with another meeting.' , data: oldBooking });
                } else {
                    Booking.addBooking(newBooking, (err, savedBooking) => {
                        if(err){
                            res.json({ success: false, message:'something went wrong. try again.' , data: null });
                        } else if (!savedBooking){
                            res.json({ success: false, message:'could not book meeting room. try again.' , data: null });
                        } else {
                            res.json({ success: true, message:'meeting room booked successfully' , data: savedBooking });    
                        }
                    });            
                }
            }
        });
    } catch (err) {
        res.json({ success: false, message:'something went wrong. try again.' , data: null });
    }
});

router.put('/:id', passport.authenticate('jwt', { session: false }),(req, res, next) => {
    var id = req.params.id;
    var newBooking = new Booking({
        _id: id,
        name: req.body.name,
        email: req.body.email,
        room: req.body.room,
        subject: req.body.subject,
        start: req.body.start,
        end: req.body.end
    });

    try{
        Booking.getById(id, (err, booking) => {
            if(err){
                res.json({ success: false, message:'something went wrong. try again.' , data: null });
            } else {
                if(!booking){
                    res.json({ success: false, message:'booking not found' , data: null });
                } else {
                    Booking.validateBooking(newBooking, (err, oldBooking) => {
                        if(err){
                            res.json({ success: false, message:'something went wrong. try again.' , data: null });
                        } else {
                            if (oldBooking){
                                res.json({ success: false, message:'time clashes with another meeting.' , data: oldBooking });
                            } else {
                                Booking.updateBooking(id, newBooking, (err, savedBooking) => {
                                    if(err){
                                        res.json({ success: false, message:'something went wrong. try again.' , data: null });
                                    } else if (!savedBooking){
                                        res.json({ success: false, message:'could not book meeting room. try again.' , data: null });
                                    } else {
                                        res.json({ success: true, message:'booking updated successfully' , data: savedBooking });    
                                    }
                                });            
                            }
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.json({ success: false, message:'something went wrong. try again.' , data: null });
    }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }),(req, res, next) => {
    var id = req.params.id;
    Booking.deleteBooking(id, (err) => {
        if(err){
            res.json({ success: false, message:'something went wrong. try again.' , data: null });
        } else {
            res.json({ success: true, message:'booking deleted successfully' ,data: null });
        }
    });
});

module.exports = router;