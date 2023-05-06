const express = require('express')
const routes = express.Router();
const blogPostController = require('../controller/blogPostController');
const imageUpload = require('../middleware/imageupload');

routes.get('/blogpost',blogPostController.blogpost);
routes.get('/blogpostdeletData/:id',blogPostController.blogpostDelete);
routes.get('/blogposteditData/:id',blogPostController.blogpostedit);
routes.get('/blogpostactive/:id',blogPostController.blogpostActive);
routes.get('/blogpostdeactive/:id',blogPostController.blogpostDeactive);
routes.get('/fullblog/:id',blogPostController.blogFullPost);
routes.post('/blogpostData',imageUpload,blogPostController.blogpostData);
routes.post('/blogpostupdateData/:id',imageUpload,blogPostController.blogpostupdated);

module.exports = routes;