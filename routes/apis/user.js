const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {getUsers, deleteUser} = require('../../controllers/user');
const config = require('../../config/db');
const User = require('../../models/user');


router.get('/users', getUsers); // tüm userları getirir

// login olmuş kişi için sadece bilgileri getirir
router.get('/profile', passport.authenticate('jwt', {session:false}) , (req, res) => {
      return res.json(req.user);

});
 
router.delete('/user/:id', deleteUser);

module.exports = router;
