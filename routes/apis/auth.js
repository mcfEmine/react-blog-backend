const express = require('express');

const {registerProfile, login} = require('../../controllers/auth');
const {userById} = require('../../controllers/user');
const validator = require('../../validator/user');

const router = express.Router();

router.post('/signup',  validator.createUserValid, registerProfile ); 
router.post('/signin', login); // username, password

router.param("userId", userById); 

module.exports = router;