'use strict';
const express = require('express');
const router = express.Router();
const score_controller = require('../controllers/score.controller');

router.get('/', score_controller.getAll);
router.post('/add', score_controller.add);
router.post('/submit', score_controller.submit);
module.exports = router;