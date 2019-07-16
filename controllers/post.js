const Post = require('../models/post');
const _ = require('lodash'); 
const jwt = require('jsonwebtoken');
const config = require('../config/db');
//------------------------------------------------------------------------
exports.postById = (req, res, next, id) => {
    Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
        if(err || !post) {
            return res.status(400).json({
                error: err
            })
        }
        req.post=post
        next()
    })
}
//-------------------------------------------------------------------------
exports.getPosts = (req,res) => {
        const token = req.headers.authorization;
        if(token === 'undefined' ) {
        const posts = Post.find(  {chkPrivate: false}  )
       .populate("postedBy", "_id name")
       .select("_id title body created chkPrivate")
       .sort({created:-1}) // get latest
       .then((posts) => {
        res.status(200).json(posts); // array
    })
        }
        else{
            const token = (req.headers.authorization).split(" ")[1];
            const userId = getUserIdFromToken(token);
            const posts = Post.find( { $or:[ {chkPrivate: true, postedBy: userId}, {chkPrivate: false}  ]} )
            .populate("postedBy", "_id name")
            .select("_id title body created chkPrivate")
            .sort({created:-1}) // get latest
            .then((posts) => {
            res.status(200).json(posts); // array
    })
    .catch(err=> console.log(err));
    }
        
};
//--------------------- --------------posted (user) by who?
exports.postsByUser = (req, res)=> {
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserIdFromToken(token);

    if(userId === req.profile._id.toString()) {
            Post.find({ postedBy: req.profile._id})
            .populate("postedBy", "id name")
            .sort("_created")
            .exec((err, posts) => {
            if(err) {
                return res.status(400).json({
                    error:err
                })
            }
            // no  error
            res.json(posts);
        })
    }
    else{
        Post.find({ postedBy: req.profile._id, chkPrivate:false})
        .populate("postedBy", "id name")
        .sort("_created")
         .exec((err, posts) => {
        if(err) {
            return res.status(400).json({
                error:err
            })
        }
        // no  error
        res.json(posts);
    })

    }
    
}
//---------------------------------------------------------
exports.createPost = (req, res) => {
    let newPost = new Post(req.body);
    newPost.postedBy = req.profile;
     newPost.save( (err, result) => {
                if(err) {return res.status(400).json({error: err})} 
                res.json(result)
         })
   
};

//-------------------------------------------------------------------------
exports.deletePost = (req, res) => {
    let post = req.post // delete post
    post.remove((err, post)=> { 
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Post silindi!"
        })
    })
    
}
//--------------------------------------------------------------
exports.updatePost = (req,res) => {
    let post = req.post;
    post =_.extend(post, req.body)
    post.updated = Date.now();
    post.save(err => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(post);
    })
   
};
//----------------------------------------------------------------
    exports.isPoster = (req, res, next) => {
    let isPoster = req.user._id.equals(req.post.postedBy._id);
   // console.log("isPoster", isPoster);
    if(!isPoster) {
        return res.status(403).json({
            error: "Yetkili değilsiniz!"
        })
    }

    next();
}
//------------------------------------------------------
exports.singlePost = (req, res ) => {
    return res.json(req.post);
}
//--------------------------------------------------------------
const userIdT = getUserIdFromToken = (token) => {
    try{
        const decodeToken = jwt.verify(token, config.secret);
        return decodeToken.data._id;

    }catch(error) {
        console.log(error);
    }
    return "";
}