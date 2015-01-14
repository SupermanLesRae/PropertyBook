var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passwordHash = require('password-hash');

var session;

//Mongoose --------------------------------------------------
var db = mongoose.connection;
db.on('error', function() {
  console.log('db error');
});

var entriesSchema = new Schema({
  username:String,
  email:String,
  job:String,
  password:String
});

//entries is the collection inside our database users
var userEntries = mongoose.model('entries', entriesSchema);
mongoose.connect('mongodb://localhost:27017/users');
//Mongoose --------------------------------------------------END


//Routes --------------------------------------------------

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

router.get('/entries', function(req, res) {
  userEntries.find(function(err, entries) {
    res.send(entries);
  })
});

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
  session = req.session;
  if(session.email) {
    console.log(session.email);
    res.render('profile', { title: 'My Profile', brand: 'PropertyBook' });
  }
  else {
    res.redirect('/login');
  }
});

/* GET hot properties page. */
router.get('/hot', function(req, res) {
  session = req.session;
    res.render('hot_properties', { title: 'Hot Properties', brand: 'PropertyBook' });
});

/* GET hot properties page. */
router.get('/login', function(req, res) {
  session = req.session;
  res.render('login', { title: 'Login', brand: 'PropertyBook',  errorMsg:''});
});

//Login route
router.post('/login', function(req, res) {
  session = req.session;
  userEntries.findOne({email:req.body.email},function(err, entries) {
    if(err) {
      res.render('error', { title: 'Page Error 404' });
    }
    else {
      if(passwordHash.verify(req.body.password, entries.password) && req.body.email == entries.email) {
        session.email = req.body.email;
        return res.redirect('/profile')
      }
      else {
        res.render('login', { title: 'Login', brand: 'PropertyBook', errorMsg: 'password / email incorrect' });
      }
    }

  })
  //console.log(req.body.email + ' : ' + req.body.password);
});

/* GET hot properties page. */
router.get('/signIn', function(req, res) {
  session = req.session;
  res.render('signIn', { title: 'SignIn', brand: 'PropertyBook' });
});

/* GET profile/settings page. */
router.get('/settings', function(req, res) {
  res.render('settings', { title: 'Settings', brand: 'PropertyBook' });
});

router.get('*', function(req, res) {
  res.render('error', { title: 'Page Error 404' });
});

module.exports = router;
