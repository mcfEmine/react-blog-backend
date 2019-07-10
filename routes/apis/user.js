const express = require('express');
const router = express.Router();
const passport = require('passport');

const {userById, getAllUsers, getUser, updateUser, deleteUser} = require('../../controllers/user');



router.get('/users', getAllUsers); // tüm userları getirir
router.get('/user/:userId', passport.authenticate('jwt', {session:false}), getUser);
router.put('/user/:userId', passport.authenticate('jwt', {session:false}), updateUser);
router.delete('/user/:userId', passport.authenticate('jwt', {session:false}), deleteUser);

router.param("userId", userById);


module.exports = router;
