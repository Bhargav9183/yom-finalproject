const express = require('express')
const routes = express.Router();
const passport = require('passport');
const categoryController = require('../controller/categoryControoler')
const imageUpload = require('../middleware/imageupload')

routes.get('/addcategory',passport.checkAuthentication,categoryController.addcategory);
routes.get('/deletData/:id', categoryController.deleteCategory);
routes.get('/editData/:id', categoryController.updateCategory);
routes.get('/active/:id', categoryController.activeCategory);
routes.get('/deactive/:id', categoryController.DeactiveCategory);
routes.post('/categoryData',imageUpload, categoryController.categoryData);
routes.post('/updateData/:id',imageUpload ,categoryController.updateDatacategory);


module.exports = routes;