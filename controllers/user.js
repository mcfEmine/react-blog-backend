const User = require('../models/user');
const _ = require('lodash'); 
const bcrypt = require('bcryptjs');
//---------------------------------------
exports.userById = (req, res, next, id ) => {
    User.findById(id)
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err,user) => {
        if(err || !user) {
            return res.status(400).json({
            error : "Kullanıcı bulunamadı !"
        })
    }
        req.profile = user
        next();
    })
};
//--------------------------------------------------------------
exports.getAllUsers = (req, res) => {
    const user = User.find()
       .select("_id name email username contact")
       .then((users) => {
        res.status(200).json(users);
    })
    .catch(err=> console.log(err));
};

// --------------------------------------------------------------
exports.getUser = (req, res) => {
    req.password=undefined;
    return res.json(req.profile);
}
//-----------------------------------------------------------------
exports.updateUser = (req, res, next) => {
    let user = req.profile
    user=_.extend(user, req.body)
    //user.update = Date.now()
    user.save((err) => {
        if(err) {
            return res.status(400).json({
                error: "Bu işlemi yapmaya yetkili değilsiniz!"
            })
        }
        
        res.json({user})
    })
   }
//-------------------------------------------
exports.deleteUser = (req, res, next) => {
    let user  = req.profile;
    user.remove((err) => {
        if(err) {
            return res.json({
                error: err
            })
        }
        res.json({message: "User başarıyla silindi!"})
    })
    }
//------------------------------------------------------------------------------

// log in user -> req.body.userId
exports.addFollowing = (req, res, next) => {

    User.findByIdAndUpdate(req.body.userId, 
                            {$push:{following:req.body.followId}}, 
                            (err,result) => {
        if(err) {
            return res.status(400).json({
                error:err
            });
        }
        next();
    }) 

}
//--------------------------------------------------------------------------------
exports.addFollower = (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {$push:{followers:req.body.userId}},
        {new:true}
    ).populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error:err
            })
        }

        result.password = undefined;
        res.json(result);
    } )

};

exports.removeFollowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, {$pull:{following:req.body.unfollowId}}, (err,result) => {
    if(err) {
        return res.status(400).json({
            error:err
        });
    }
    next();
}) 

}
//--------------------------------------------------------------------------------
exports.removeFollower = (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {$pull:{followers:req.body.userId}},
    {new:true}
    ).populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result) => {
    if(err) {
        return res.status(400).json({
            error:err
        })
    }

    result.password = undefined;
    res.json(result);
} )
};
//-------------------------------------------------------------------------------------
exports.findPeople = (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    // user id si hariç
    User.find({_id: {$nin: following}}, (err, users) => {
        if(err) {
            return res.status(400).json({
                error:err
            })
        }
        else{
            res.json(users)
        }
    } ) .select ('name');

}
