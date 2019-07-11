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
//-----------------------------------------------------------------------
exports.getPosts = (req,res) => {
    const posts = Post.find().populate("postedBy", "_id name")
       .select("_id title body")
       .then((posts) => {
        res.status(200).json({posts});
    })
    .catch(err=> console.log(err));
};
//---------------------------------------------------------
exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    const post = new Post(req.body);
    
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Image upload edilemedi!"
            })
        }
        let post = new Post(fields);
        req.profile.password = undefined;
        post.postedBy = req.profile;
        //console.log("profile check",req.profile);
        if(files.photo) {
            post.photo.data = fileSystem.readFileSync(files.photo.path)
            post.photo.contenType =  files.photo.type
        }
        post.save( (err, result) => {
               if(err) {
                   return res.status(400).json({
                       error: err
                   })
               } 
               res.json(result)
        })
    })
};

//--------------------- --------------posted (user) by who?
// succ _> posts
// err handle
exports.postsByUser = (req, res)=> {
    Post.find({postedBy: req.profile._id})
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