const express = require('express');

const {registerProfile, login} = require('../../controllers/auth');

const router = express.Router();

router.post('/register', registerProfile); 
router.post('/login', login);

module.exports = router;