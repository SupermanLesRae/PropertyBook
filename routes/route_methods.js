/**
 * Created by Les-rae.Superman on 15/01/2015.
 */
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var userEntry = require('../models/userEntry');

var db = mongoose.connection;
db.on('error', function() {
    console.log('db error');
});
mongoose.connect('mongodb://localhost:27017/propertydb');
var session = {
    isLoggedIn:false
};


module.exports = {

    //landing ----------------------------------------------------------------------------------------------------------
    home: function (req, res) {
        console.log('Home Call');
        session = req.session;
        res.render('index', { title: 'Home', session:session});
    },
    //login ------------------------------------------------------------------------------------------------------------
    login: function (req, res) {
        console.log('login Call');
        session = req.session;
        res.render('login', { title: 'Login', session:session});
    },
    //Login Post -------------------------------------------------------------------------------------------------------
    login_post: function (req, res) {
        console.log('login post Call');
        userEntry.findOne({email:req.body.email},function(err, entries) {
            if(err) {
                console.log('db error');
                res.render('error', { title: 'Page Error 404' });
            }
            else {
                if(passwordHash.verify(req.body.password, entries.password) && req.body.email == entries.email) {
                    req.session.email = req.body.email;
                    req.session.isLoggedIn = true;
                    session = req.session;
                    return res.redirect('/profile')
                }
                else {
                    res.render('login', { title: 'Login', session: session });
                }
            }
        })

    },
    //logout -----------------------------------------------------------------------------------------------------------
    logout: function (req, res) {
        console.log('logout Call');
        req.session.isLoggedIn = false;
        session = req.session;
        res.redirect('/login');
    },
    //register ---------------------------------------------------------------------------------------------------------
    register: function (req, res) {
        console.log('register Call');
        session = req.session;

        res.render('register', { title: 'Register', session: session});
    },
    //register ---------------------------------------------------------------------------------------------------------
    register_post: function (req, res) {
        console.log('register Post Call: ' + req.body.email);
        session = req.session;
        userEntry.findOne({email:req.body.email},function(err, entries) {
            if(err) {
                console.log('404 Error')
            }
            else {
                if(entries == null) {
                 console.log('add new user');
                }
                else {
                    req.flash('info', ['Email already exists', 'name must be 2 char min']);
                    res.render('register', { title: 'Register', session:session });
                }
            }
        })

    },
    //profile ----------------------------------------------------------------------------------------------------------
    profile: function (req, res) {
        console.log('profile Call');
        session = req.session;
        if(session.email) {
            res.render('profile', { title: 'Profile', session:session });
        }
        else {
            res.redirect('/login');
        }
    },
    //settings ---------------------------------------------------------------------------------------------------------
    settings: function (req, res) {
        console.log('settings Call');
        session = req.session;
        res.render('settings', { title: 'Settings', session:session});
    },
    //search -----------------------------------------------------------------------------------------------------------
    search: function (req, res) {
        session = req.session;
        res.render('search', { title: 'Search', session:session});
    },
    //hot properties ---------------------------------------------------------------------------------------------------
    hot_properties: function (req, res) {
        console.log('hot properties Call');
        session = req.session;
        res.render('hot_properties', { title: 'Hot Properties', session:session});
    },
    //error ------------------------------------------------------------------------------------------------------------
    error: function (req, res) {
        res.render('error', { title: '404Error'});
    },
    //test -------------------------------------------------------------------------------------------------------------
    //used to test find and update functionality
    test: function (req, res) {

        userEntry.findOne({email:req.body.email},function(err, entries) {
            var pass = passwordHash.generate('123');

            var query = {"name": "Les-Rae"};
            var update = {"password": pass};
            var options = {new: false};
            userEntry.findOneAndUpdate(query, update, options, function(err, person) {
                if (err) {
                    console.log('got an error');
                }
                res.json({ message: 'entry updated' });
            });
        })
    }
};

/*
    Sessions: * seeions are held within the req.session object.
                when a update is made to the session you first change the req session obj eg. req.session.isLoggedIn = false;
                Then set session = req.session to update session var.

    Update database value: *

                 userEntry.findOneAndUpdate(query, update, options, callback);

*/
