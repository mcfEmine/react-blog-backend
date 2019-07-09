const express = require('express');
//------------------------------------------------------------
const validator = require('../../validator');
const {getPosts, createPost, updatePost,deletePost} = require('../../controllers/post');
const router = express.Router();
//--------------------------------------------
router.get('/', getPosts);
//-------------------------------------------------------
router.post('/add', validator.createPostValid, createPost);
//-------------------------------------------------
router.put('/update/:id', updatePost);
//--------------------------------------------------------
router.delete('/delete/:id', deletePost);



module.exports = router;
