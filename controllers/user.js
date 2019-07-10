const User = require('../models/user');
//---------------------------------------
exports.getUsers = (req, res) => {
    const user = User.find()
       .select("_id name email username password contact")
       .then((users) => {
        res.status(200).json({users});
    })
    .catch(err=> console.log(err));
};
//-------------------------------------------
exports.deleteUser = (req, res) => {
    const id=req.params.id;
    console.log("delete gelen id " , id);
    User.findById(id).then(user=> {
        user.delete().then(user=> {
                res.send({message: 'User delete success', status: 'OK', user:user}) 
            })
            .catch(err=>console.log(err));
          })
          .catch(err=>console.log(err));
       
    };

