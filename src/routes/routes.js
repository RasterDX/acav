const app = require('express');
const router = app.Router();

const indexController = require('../controllers/index-controller');

// GET index page
router.get('/', indexController.index);
router.get('/index', indexController.indexPage);

module.exports = router;
