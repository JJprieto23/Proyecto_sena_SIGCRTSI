const express = require('express');

const authController = require();

const router = express.Router();

router.post('/register', authController.register )

module.exports = router;