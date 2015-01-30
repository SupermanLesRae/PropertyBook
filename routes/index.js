var express = require('express');
var router = express.Router();
var routesCall = require('./route_methods');

//Home
router.get('/', routesCall.home);
router.get('/posts', routesCall.posts);
//
router.get('/rentals', routesCall.rentals);
//Login Post
router.post('/login', routesCall.login_post);
//Login
router.get('/login', routesCall.login);
//Logout
router.get('/logout', routesCall.logout);
//Register
router.get('/register', routesCall.register);
//Register Post
router.post('/register', routesCall.register_post);
//Profile
router.get('/profile', routesCall.profile);
//Settings
router.get('/settings', routesCall.settings);
//Hot Properties
router.get('/hot', routesCall.hot_properties);
//Search
router.get('/search', routesCall.search);
//Test
router.get('/test', routesCall.test);
//Error
router.get('*', routesCall.error);

module.exports = router;

