var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// quick hello world
router.get('/hello', function(req, res){
  res.render('index', {
    title: 'Hello'
  });
});

//GET for the user list page
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{}, function(e, docs){
    res.render('userlist', {
    "userlist" : docs
    });
  });
});

//GET for the new user page
router.get('/newuser', function(req, res) {
  res.render('newuser', {
    title: 'Add New User'
  });
});

//POST for adding a user
router.post('/adduser', function(req, res) {
  //Set the db var
  var db = req.db;

  //Get our form values(same as the "name" attr on the jade view page)
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //Set it to the right collection/table in the db
  var collection = db.get('usercollection');

  //Submit the data to the db
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function(err, doc) {
    if(err) {
      res.send("Big error, ya fucked up");
    } else {
      //redirects if it is a success
      res.redirect("userlist");
    }
  });
});

module.exports = router;
