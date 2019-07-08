const express = require('express');
//------------------------------------------------------------
const validator = require('../../validator');
const {getPosts, createPost, updatePost,deletePost,getProfile,registerProfile} = require('../../controllers/post');
const router = express.Router();
//--------------------------------------------
router.get('/', getPosts);
//-------------------------------------------------------
router.post('/add', validator.createPostValid, createPost);
//-------------------------------------------------
router.put('/update/:id', updatePost);
//--------------------------------------------------------
router.delete('/delete/:id', deletePost);
//--------------------------------------------------
router.get('/profile', getProfile);
//--------------------------------------------------
router.post('/register', registerProfile);


module.exports = router;
