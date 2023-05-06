const express = require('express')
const routes = express.Router();
const recentController = require('../controller/recentPostController');
const imageUpload = require('../middleware/imageupload');

routes.get('/recentpost',recentController.recentPosts);
routes.get('/postdeletData/:id',recentController.recentPostsdelete);
routes.get('/posteditData/:id',recentController.recentPostsedit);
routes.get('/postactive/:id',recentController.recentPostactive);
routes.get('/postdeactive/:id',recentController.recentPostdeactive);
routes.post('/recentpostData',imageUpload,recentController.recentpostinsert);
routes.post('/postupdateData/:id',imageUpload,recentController.recentpostinsertData);



module.exports =routes;
