const User = require('../models/user');
const _ = require('lodash'); 
//---------------------------------------
exports.userById = (req, res, next, id ) => {
    
    User.findById(id).exec((err,user) => {
        
        if(err || !user) {
            return res.status(400).json({
            error : "User mevcut değil!"
        })
    }
    req.profile = user
    next();
})
};

exports.getAllUsers = (req, res) => {
    const user = User.find()
       .select("_id name email username contact")
       .then((users) => {
        res.status(200).json(users);
    })
    .catch(err=> console.log(err));
};

// 
exports.getUser = (req, res) => {
    req.password=undefined;
    return res.json(req.profile);
}
//
exports.updateUser = (req, res, next) => {
    let user = req.profile
    user=_.extend(user, req.body)
    user.update = Date.now()
    user.save((err) => {
        if(err) {
            return res.json({
                error: err
            })
        }
        req.profile.password = undefined
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
