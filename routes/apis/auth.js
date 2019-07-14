const express = require('express');
const {signup, signin} = require('../../controllers/auth');
const {userById} = require('../../controllers/user');
const validator = require('../../validator/user');
const router = express.Router();

router.post('/signup',  validator.createUserValid, signup ); 
router.post('/signin', signin); // username, password
router.param("userId", userById); 

module.exports = router;