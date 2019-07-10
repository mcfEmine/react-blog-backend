const User = require('../models/user');
const jwt =require('jsonwebtoken');
const config = require('../config/db')
const passport = require('passport');

//------------------------------------LOGIN-----------------------------------------
exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(username, (err, user) => {
       

        if(err) throw err;
        if(!user) {
            return res.json ({
                success: false,
                message: "User mevcut değil!"
            });
        }
            // user exist!
           
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({
                      type: "user",
                      data : {         // payload data  verify signature HMACSHA256
                          _id: user._id,
                          username : user.username,
                          name: user.name,
                          email : user.email,
                          contact : user.contact
                        }
                        }, config.secret, {
                            expiresIn: 604800 // 1 week - miliseconds
                         }
                    );
                    return res.json({
                        success : true,
                        token : "JWT" + token 
                    });
                } else {
                    return res.json({
                        success : true,
                        message: "Password yanlış!"
                    });
                }
    });
 

});
}
//----------------------------------SIGN UP----------------------------------------------------

exports.registerProfile = (req, res) => {
    let newUser = new User(req.body);
    User.addUser(newUser, (err, user) => {
    if(err) {
        let message = ""
        if(err.errors.username) message= "Username önceden var! ";
        if(err.errors.email) message += " Email önceden var! ";
        return res.json({
            success: false,
            message
        });
    } else{
        return res.json( {
            success: true,
            message: "User register ok!"
        })
    }
});
};
//-----------------------------------------------------------------
