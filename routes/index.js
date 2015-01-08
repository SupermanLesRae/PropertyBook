var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'My property Book', brand: 'PropertyBook' });
});

router.get('*', function(req, res) {
  res.render('error', { title: 'Page Error 404' });
});

module.exports = router;
