"use strict";
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var mongoose = require('mongoose');
var i18n = require("i18n");
var Schema   = mongoose.Schema;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 多言語化の利用設定
i18n.configure({
  // 利用するlocalesを設定。これが辞書ファイルとひも付きます
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  // 辞書ファイルのありかを指定
  directory: __dirname + "/locales",
  // オブジェクトを利用したい場合はtrue
  objectNotation: true
});

app.use(i18n.init);
// manualでi18nセッション管理できるように設定しておきます
app.use(function (req, res, next) {
  if (req.session.locale) {
    i18n.setLocale(req, req.session.locale);
  }
  next();
});

// ユーザーモデル　TODO場所を移したい
var UserSchema = new Schema({
  name:  String,
  password: String
});
mongoose.model('User', UserSchema);

// 使用フェーズ
mongoose.connect('mongodb://localhost/yui_talk', {useNewUrlParser: true});

var User = mongoose.model('User');

// 各画面読み込み
// 認証が必要な画面は、isAuthenticatedを記載すること
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/home', isAuthenticated, homeRouter);

// ログイン時の挙動
app.post('/login',
    passport.authenticate('local',
    {
      // 成功時の遷移先
      successRedirect: '/home',
      // 失敗時の遷移先
      failureRedirect: '/login',
      // 失敗時にフラッシュメッセージを使用
      failureFlash: true
    })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ユーザー認証
passport.use(new LocalStrategy({
    // フィールド名とusername,passwordのマッピング
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user){
        return done(null, false, { message: 'ユーザー名に誤りがあります。' });
      }
      // TODOパスワードは暗号化していないため、単純な比較としている
      if (!password || user.password != password) {
        return done(null, false, { message: 'パスワードに誤りがあります。' });
      }
      return done(null, user, { message: 'ログイン成功' });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   User.findById(id, function (err, user) {
      done(err, user);
   });
});

// 各画面を呼ぶ前に行う認証チェック
function isAuthenticated(req, res, next){
  // 認証済
  if (req.isAuthenticated()) {
      return next();
  }
  else {
    // 認証されていない
    res.redirect('/login');  // ログイン画面に遷移
  }
}

module.exports = app;
