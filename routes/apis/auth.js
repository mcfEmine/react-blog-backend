const express = require('express');

const {registerProfile, login} = require('../../controllers/auth');
const {userById} = require('../../controllers/user');

const router = express.Router();

router.post('/signup', registerProfile); 
router.post('/signin', login); // username, password

router.param("userId", userById); 

module.exports = router;