var express = require('express');
var router = express.Router();

/* GET chatroom page. */
router.get('/', function(req, res, next) {
  // ログインユーザー取得
  var user = req.session.passport.user;
  console.log(user.name);
  res.render('chatroom', { title: 'ルーム', username: user.name });
});

module.exports = router;
