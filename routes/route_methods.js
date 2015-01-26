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
    posts: function (req, res) {
        res.render('posts', { title: 'Home', session:session});
    },
    //landing ----------------------------------------------------------------------------------------------------------
    rentals: function (req, res) {
        res.render('rentals', { title: 'Rentals', session:session});
    },
    //home ----------------------------------------------------------------------------------------------------------
    home: function (req, res) {
        res.render('home', { title: 'Home', session:session});
    },
    //login ------------------------------------------------------------------------------------------------------------
    login: function (req, res) {

        if(session.hasUserLoggedOut){
            req.flash('goodbye', ['Logout successful, goodbye']);
            console.log('session.hasUserLoggedOut: ' + session.hasUserLoggedOut);
            session.hasUserLoggedOut = false;
        }
        res.render('login', { title: 'Login', session:session});
    },
    //Login Post -------------------------------------------------------------------------------------------------------
    login_post: function (req, res) {
        session = req.session;
        userEntry.findOne({email:req.body.email},function(err, entries) {
            if(err) {
                console.log('db error');
                res.render('error', { title: 'Page Error 404' });
            }
            else {
                if(passwordHash.verify(req.body.password, entries.password) && req.body.email == entries.email) {
                    session.email = req.body.email;
                    session.isLoggedIn = true;
                    session.hasUserLoggedOut = false;
                    session.name = entries.name;
                    return res.redirect('/profile')
                }
                else {
                    req.flash('info', ['username / password incorrect']);
                    res.render('login', { title: 'Login', session: session });
                }
            }
        })
    },
    //logout -----------------------------------------------------------------------------------------------------------
    logout: function (req, res) {
        session = req.session;
        session.hasUserLoggedOut = true;
        session.isLoggedIn = false;
        session.email = null;
        res.redirect('/login');
    },
    //register ---------------------------------------------------------------------------------------------------------
    register: function (req, res) {
        res.render('register', { title: 'Register', session: session});
    },
    //register ---------------------------------------------------------------------------------------------------------
    register_post: function (req, res) {
        userEntry.findOne({email:req.body.email},function(err, entries) {
            if(err) {
                console.log('404 Error')
            }
            else {
                if(entries == null) {
                 console.log('add new user');
                }
                else {
                    req.flash('info', ['Email already exists']);
                    res.render('register', { title: 'Register', session:session });
                }
            }
        })

    },
    //profile ----------------------------------------------------------------------------------------------------------
    profile: function (req, res) {
        if(session.isLoggedIn) {
            req.flash('welcome', [session.name]);
            res.render('profile', { title: 'Profile', session:session });
        }
        else {
            res.redirect('/login');
        }
    },
    //settings ---------------------------------------------------------------------------------------------------------
    settings: function (req, res) {
        if(session.isLoggedIn){
            res.render('settings', { title: 'Settings', session:session});
        }
        else {
            res.redirect('/login');
        }
    },
    //search -----------------------------------------------------------------------------------------------------------
    search: function (req, res) {
        res.render('search', { title: 'Search', session:session});
    },
    //hot properties ---------------------------------------------------------------------------------------------------
    hot_properties: function (req, res) {
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
