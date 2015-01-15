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
var session;

module.exports = {

    //landing ----------------------------------------------------------------------------------------------------------
    home: function (req, res) {
        console.log('Home Call');
        res.render('index', { title: 'Home'});
    },
    //login ------------------------------------------------------------------------------------------------------------
    login: function (req, res) {
        console.log('login Call');
        session = req.session;
        res.render('login', { title: 'Login',  errorMsg:''});
    },
    //Login Post -------------------------------------------------------------------------------------------------------
    login_post: function (req, res) {
        console.log('login post Call');
        session = req.session;
        userEntry.findOne({email:req.body.email},function(err, entries) {
            if(err) {
                console.log('db error');
                res.render('error', { title: 'Page Error 404' });
            }
            else {
                if(passwordHash.verify(req.body.password, entries.password) && req.body.email == entries.email) {
                    session.email = req.body.email;
                    return res.redirect('/profile')
                }
                else {
                    res.render('login', { title: 'Login', errorMsg: 'password / email incorrect' });
                }
            }
        })

    },
    //register ---------------------------------------------------------------------------------------------------------
    register: function (req, res) {
        console.log('register Call');
        session = req.session;
        res.render('register', { title: 'Register' });
    },
    //profile ----------------------------------------------------------------------------------------------------------
    profile: function (req, res) {
        console.log('profile Call');
        session = req.session;
        if(session.email) {
            res.render('profile', { title: 'Profile' });
        }
        else {
            res.redirect('/login');
        }
    },
    //settings ---------------------------------------------------------------------------------------------------------
    settings: function (req, res) {
        console.log('settings Call');
        res.render('settings', { title: 'Settings'});
    },
    //search -----------------------------------------------------------------------------------------------------------
    search: function (req, res) {
        res.render('search', { title: 'Search'});
    },
    //hot properties ---------------------------------------------------------------------------------------------------
    hot_properties: function (req, res) {
        console.log('hot properties Call');
        session = req.session;
        res.render('hot_properties', { title: 'Hot Properties'});
    },
    //error ------------------------------------------------------------------------------------------------------------
    error: function (req, res) {
        res.render('error', { title: '404Error'});
    },
    //test -------------------------------------------------------------------------------------------------------------
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
