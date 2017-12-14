var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var config = require('../config/auth');


router.post('/register', (req, res, next) => {
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    User.getByEmail(newUser.email, (err, user) => {
        if(err){
            res.json({ success: false, message: 'failed to register user' });
        } else if (user) {
            res.json({ success: false, message: 'failed to register. user already exists' });
        } else {
            User.addUser(newUser, (err, user) => {
                if(err){
                    res.json({ success: false, message: 'failed to register user' });
                } else {
                    res.json({ success: true, message: 'user registered successfully' });
                }
            });
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;

    User.getByEmail(email, (err, user) => {
        if(err){
            res.json({ success: false, message: 'something went wrong. try again in sometime.' });
        } else if (!user) {
            res.json({ success: false, message: 'user not found' });
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    var userDetails = {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    };
                    var token = jwt.sign(userDetails, config.secret, {
                        expiresIn: 3600
                    });
                    res.json({ success: true, token: token, user: userDetails, expiresIn: 3600 });
                } else {
                    res.json({ success:false, message: 'incorrect password' });
                }
            });
        }
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;