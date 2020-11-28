const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-controller');


router.get('/', controller.index);
router.get('/proximo', controller.proximo);
router.get('/acertei', controller.acertei);
router.get('/novo-prato', controller.novoPrato)
router.get('/nova-opcao', controller.novaOpcao)
router.post('/save', controller.save);

module.exports = router;