const express = require('express');
const passport = require('passport');
//------------------------------------------------------------
const validator = require('../../validator');
const {getPosts, createPost, postsByUser, updatePost,deletePost, postById,isPoster} = require('../../controllers/post');
const {userById} = require('../../controllers/user');

const router = express.Router();
//--------------------------------------------
router.get('/allPosts', passport.authenticate('jwt', {session:false}), getPosts);

router.get("/posts/by/:userId", passport.authenticate('jwt', {session:false}), postsByUser);
//----------------------CREATE POST-------------------------
router.post('/post/new/:userId', passport.authenticate('jwt', {session:false}), 
createPost,validator.createPostValid, ); // for token pass the userId
//----------------------UPDATE POST-------------------
router.put('/post/:postId', passport.authenticate('jwt', {session:false}), isPoster,updatePost);
//-----------------------DELETE POST---------------------------
router.delete('/post/:postId', passport.authenticate('jwt', {session:false}), isPoster, deletePost);
// eğer route userId içeriyorsa "app" ilk olarak bu metodu çalıştırır!
// Verilen user Id nin postlarını bulur
router.param("userId", userById); 
router.param("postId", postById); // eğer route postId içeriyorsa "app" ilk olarak bu metodu çalıştırır!


module.exports = router;
