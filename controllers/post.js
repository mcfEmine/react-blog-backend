const Post = require('../models/post');
const formidable = require('formidable');
const fileSystem = require('fs');

   
//--------------------------------------------------------------------------------------------------
/*
 {
            "_id": "5d25f332feb64a2cb8530afd",
            "title": "my title",
            "body": "my form body data",
            "postedBy": {
                "_id": "5d25eea0f8652d06885824df",
                "name": "myuser"
            }
        },
*/

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

//----------------------------------------------------------------

exports.isPoster = (req, res, next) => {
    
    console.log("req.post", req.post);
    console.log("****************************************************************");

    console.log("req.post.postedBy._id", req.post.postedBy._id);
    console.log("****************************************************************");
    console.log("req.JWT", req.jwt);
    console.log("****************************************************************");

    isPoster = false;
    let isPoster = req.post;  
    if(!isPoster) {
        return res.status(403).json({
            error: "User authorize değil!"
        })
    }
    next();
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
    let id=req.params.id;
    Post.findById(id).then(post=> {
        post.title = req.body.title;
        post.body = req.body.body;
        post.save().then(post=> {
            res.send({
                message: 'Post update success', status: 'OK', post:post})
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
   
};