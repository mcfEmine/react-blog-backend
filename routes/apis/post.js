const express = require('express');
//------------------------------------------------------------
const validator = require('../../validator');
const {getPosts, createPost} = require('../../controllers/post');
const router = express.Router();
//--------------------------------------------
router.get('/', getPosts);
//---------------ADD-------------------------------------------
router.post('/add', validator.createPostValid, createPost);


module.exports = router;
