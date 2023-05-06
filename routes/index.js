const express = require('express')
const routes = express.Router();
const controller = require('../controller/controller')
const passport = require('passport');
const categoryrotes = require('./categoryroutes')
const yomroutes = require('./user/yomroutes');
const recentpost = require('../routes/recentPostroutes');
const blogPostroutes = require('../routes/blogPostRoutes');

routes.get('/admin', controller.login);
routes.get('/home',passport.checkAuthentication,controller.home);
routes.get('/profile',passport.checkAuthentication,controller.profile);
routes.get('/login', controller.login);
routes.get('/forgot', controller.forgot);
routes.get('/otp', controller.otp);
routes.get('/newpassword', controller.newpassword);
routes.get('/register', controller.register);
routes.get('/logout', controller.logout);
routes.post('/registerData', controller.registerData);
routes.post('/loginDAta',passport.authenticate('local',{failureRedirect:'/'}),controller.loginDAta);
routes.post('/forgetData', controller.forgetData);
routes.post('/otpData', controller.otpData);
routes.post('/newpasswordDATA', controller.newpasswordDATA);
routes.post('/profileupdate/:id', controller.profileupdate);
routes.use('/',categoryrotes)
routes.use('/',yomroutes);
routes.use('/',recentpost);
routes.use('/',blogPostroutes);


module.exports = routes