const router = require('express').Router();
const { home } = require('../controller/controller');

router.get('/', home);

module.exports.router = router;