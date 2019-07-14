const express = require('express');
const router = express.Router();
const passport = require('passport');
const validator = require('../../validator/user');
const {requireSignin} =require('../../controllers/auth');

const {userById, getAllUsers, getUser, updateUser, 
    deleteUser, addFollowing, addFollower, removeFollowing , 
    removeFollower, findPeople } = require('../../controllers/user');

router.put('/user/follow', passport.authenticate('jwt', {session:false}), addFollowing, addFollower);
router.put('/user/unfollow', passport.authenticate('jwt', {session:false}), removeFollowing, removeFollower);
router.get('/users', getAllUsers); // tüm userları getirir
router.get('/user/:userId', passport.authenticate('jwt',{session:false}), getUser);
router.put('/user/:userId', passport.authenticate('jwt', {session:false}), updateUser );
router.delete('/user/:userId', passport.authenticate('jwt', {session:false}), deleteUser);
router.get('/user/findpeople/:userId', passport.authenticate('jwt', {session:false}), findPeople)

router.param("userId", userById);


module.exports = router;
