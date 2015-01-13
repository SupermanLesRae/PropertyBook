var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'My property Book', brand: 'PropertyBook' });
});

/* GET profile find page. */
router.get('/find', function(req, res) {
  res.render('find', { title: 'Find Uses', brand: 'PropertyBook' });
});

/* GET profile page. */
router.get('/profile', function(req, res) {
  res.render('profile', { title: 'My Profile', brand: 'PropertyBook' });
});

/* GET profile/settings page. */
router.get('/settings', function(req, res) {
  res.render('settings', { title: 'Settings', brand: 'PropertyBook' });
});

router.get('*', function(req, res) {
  res.render('error', { title: 'Page Error 404' });
});

module.exports = router;
