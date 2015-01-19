var express = require('express');
var router = express.Router();
var routesCall = require('./route_methods');

/*
//mongoose data entries
var pass = passwordHash.generate('password123');
router.get('/entries/:username', function(req, res) {
  console.log(pass);
  userEntries.update({username:req.params.username}, {password:pass},function(err, entries) {
    userEntries.find(function(err, entries) {
      res.send(entries);
    })
  })

});
*/
/*
router.get('/entries', function(req, res) {
  userEntries.find(function(err, entries) {
    res.send(entries);
  })
});
*/


//Home
router.get('/', routesCall.home);
router.get('/posts', routesCall.posts);
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

