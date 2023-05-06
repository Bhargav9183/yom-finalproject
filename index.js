const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/mongoose');
const multer = require('multer');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stretgy');
const session = require('express-session');
const cookie = require('cookie-parser');
const connect_mongo = require('connect-mongo');
app.use('/uploads', express.static(path.join('uploads')));
app.set('view engine', 'ejs');
app.use(express.static('public'))  // public folder link
app.use(express.static('public/user'))  // public folder link
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
        name:'makwana',
       secret:'bhargav',
       resave: true,
       saveUninitialized:true,
       store: new connect_mongo({
        mongoUrl: 'mongodb://127.0.0.1/Final-project-yom',
        collectionName: "sessions"
    }),
       cookie:{
        maxAge:1000*60*60
       }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use(cookie());





app.use('/', require('./routes'))
app.listen(5000);