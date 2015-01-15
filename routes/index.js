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
//Login Post
router.post('/login', routesCall.login_post);
//Login
router.get('/login', routesCall.login);
//Register
router.get('/register', routesCall.register);
//Profile
router.get('/profile', routesCall.profile);
//Settings
router.get('/settings', routesCall.profile);
//Hot Properties
router.get('/hot', routesCall.hot_properties);
//Search
router.get('/search', routesCall.search);
//Test
router.get('/test', routesCall.test);
//Error
router.get('*', routesCall.error);

module.exports = router;

