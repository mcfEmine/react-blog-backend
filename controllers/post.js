const Post = require('../models/post');
const formidable = require('formidable');
const fileSystem = require('fs');
const _ = require('lodash'); 
  
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
//---------------------------------------------------------------PRIVATE EKLEDİM-
exports.getPosts = (req,res) => {
      const posts = Post.find( {chkPrivate: {$in: false}} )
       .populate("postedBy", "_id name")
       .select("_id title body created private")
       .sort({created:-1}) // get latest
       .then((posts) => {
        res.status(200).json(posts); // array
    })
    .catch(err=> console.log(err));
};
//--------------------- --------------posted (user) by who?
// succ _> posts
// err handle
//, {chkPrivate: {$nin: true}}

exports.postsByUser = (req, res)=> {
    
    console.log(" headers --> ", req.headers.authorization);
    

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