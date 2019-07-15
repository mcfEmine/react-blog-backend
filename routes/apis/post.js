const express = require('express');
const passport = require('passport');
//------------------------------------------------------------
const validator = require('../../validator/index');
const {getPosts, createPost, postsByUser, 
        updatePost,deletePost, postById,isPoster, singlePost} = require('../../controllers/post');
const {userById} = require('../../controllers/user');

const router = express.Router();
//--------------------------------------------
router.get('/posts', getPosts);

router.get("/posts/by/:userId", passport.authenticate('jwt', {session:false}), postsByUser);
//----------------------------SINGLE POST-------------------------------------------------
router.get('/post/:postId', singlePost);
//----------------------CREATE POST--------------------------------------------------------
router.post('/post/new/:userId', passport.authenticate('jwt', {session:false}), createPost); 
//----------------------UPDATE POST-------------------
router.put('/post/:postId', passport.authenticate('jwt', {session:false}), isPoster,updatePost);
//-----------------------DELETE POST---------------------------
router.delete('/post/:postId', passport.authenticate('jwt', {session:false}), isPoster, deletePost);
// eğer route userId içeriyorsa "app" ilk olarak bu metodu çalıştırır!
// Verilen user Id nin postlarını bulur
router.param("userId", userById); 
router.param("postId", postById); // eğer route postId içeriyorsa "app" ilk olarak bu metodu çalıştırır!


module.exports = router;
