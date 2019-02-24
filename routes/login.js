var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  var messages = [];
  var errorMsgs = req.flash("error");

  if (errorMsgs !== undefined && errorMsgs.length != 0) {
    messages = errorMsgs;
  }

  res.render('login', { title: 'ログイン', messages: messages });
});

/*router.post('/', function(req, res, next) {
  console.log(req.body);
  res.render('login', { title: 'ログイン' });
});*/

/*router.post('/',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);*/

module.exports = router;
