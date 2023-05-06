const express = require('express')
const routes = express.Router();
const yomcontroller = require('../../controller/user/yomController');

routes.get('/',yomcontroller.home);


module.exports = routes;