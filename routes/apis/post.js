const express = require('express');
const router = express.Router();
//------------------------------------------------------------
const Post = require('../../models/post');
const {createPostValid} = require('../../validator/index');
//----------------------POST-----------------
router.get('/', (req,res, next)  => {
    const posts = Post.find()
       .select("_id title body")
       .then((posts) => {
        res.status(200).json({posts});
    })
    .catch(err=> console.log(err));
});
//---------------ADD-------------------------------------------
router.post('/add', createPostValid, (req,res,next) => {
    const post = new Post(req.body  );
    post.save()
    .then(result=> {
        res.status(200).json({ 
            post:result
        })
    })
    .catch(err=>console.log(err));
})

//----------------UPDATE-----------------------------------------


module.exports = router;
