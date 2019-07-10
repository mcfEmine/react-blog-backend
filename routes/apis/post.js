const express = require('express');
const passport = require('passport');
//------------------------------------------------------------
const validator = require('../../validator');
const {getPosts, createPost, postsByUser, updatePost,deletePost} = require('../../controllers/post');
const {userById} = require('../../controllers/user');

const router = express.Router();
//--------------------------------------------
router.get('/allPosts', passport.authenticate('jwt', {session:false}), getPosts);
//-------------------------------------------------------
router.post('/post/new/:userId',  passport.authenticate('jwt', {session:false}), createPost, validator.createPostValid); // for token pass the userId
//-------------------------------------------------
router.put('/update/:userId', updatePost);
//--------------------------------------------------------
router.delete('/delete/:userId', deletePost);
//

router.get("/posts/by/:userId", passport.authenticate('jwt', {session:false}), postsByUser);

router.param("userId", userById);


module.exports = router;
