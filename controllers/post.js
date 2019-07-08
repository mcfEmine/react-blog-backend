const Post = require('../models/post');
const User = require('../models/user');

//-------------------------------------------
exports.registerProfile = (req, res) => {
    let newUser = new User(req.body);
//     user.save().then(result=> {
//         res.status(200).json({
//             post:result
//     })
// })
//    .catch(err=>console.log(err));
User.addUser(newUser, (err, user) => {
    if(err) {
        let message = ""
        if(err.errors.username) message= "Username önceden var";
        if(err.errors.email) message= "email önceden var";
        return res.json({
            success: false,
            message
        });
    } else{
        return res.json( {
            success: true,
            message: "User ok"
        })
    }
});
};
//---------------------------------------
exports.getProfile = (req, res) => {
    let user = User.find()
       .select("_id name email username password contact")
       .then((users) => {
        res.status(200).json({users});
    })
    .catch(err=> console.log(err));
};
//--------------------------------------------------------------------------------------------------
exports.getPosts = (req,res) => {
    const posts = Post.find()
       .select("_id title body")
       .then((posts) => {
        res.status(200).json({posts});
    })
    .catch(err=> console.log(err));
};
//---------------------------------------------------------
exports.createPost = (req, res) => {
    const post = new Post(req.body);
    post.save().then(result=> {
        res.status(200).json({ 
            post:result
    })
})
   .catch(err=>console.log(err));
};
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
//-------------------------------------------------------------------------
exports.deletePost =(req, res) => {
    let id=req.params.id;
    Post.findById(id).then(post=> {
        post.delete().then(post=> {
            res.send({
                message: 'Post delete success', status: 'OK', post:post})
        })
        .catch(err=>console.log(err));
      })
      .catch(err=>console.log(err));
}




