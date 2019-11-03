const app = require('express');
const router = app.Router();

const indexController = require('../controllers/index-controller');

// GET index page
router.get('/', indexController.indexPage);

module.exports = router;
