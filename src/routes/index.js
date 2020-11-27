const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-controller');


router.get('/', controller.index);
router.get('/proximo', controller.proximo);


module.exports = router;