const User = require('../models/user');
const jwt =require('jsonwebtoken');
const config = require('../config/db')
const passport = require('passport');

//------------------------------------sign in-----------------------------------------
exports.signin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
       User.getUserByUserName(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json ({
                success: false,
                message: "Kullanıcı tanımlı değildir. Lütfen üye olunuz."
            });
        }
            // user exist!
           
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign({
                      type: "user",
                      data : { _id: user._id,username : user.username }
                        }, config.secret, {expiresIn: 604800 } );
                        
                    return res.json({
                        success : true,
                        token : "jwt " + token,
                        user:user
                    });
                } else {
                    return res.json({
                        success : false,
                        message: "Kullanıcı adı ve password eşleşmedi !"
                    });
                }
    });
 

});
}
//----------------------------------SIGN UP----------------------------------------------------
exports.signup = (req, res) => {
    let newUser = new User(req.body);
    User.addUser(newUser, (err, user) => {
    if(err) {
        let message = ""
        if(err.errors.username) message= "Bu username daha önceden kullanılmıştır. ! ";
        if(err.errors.email) message += " Bu e_posta daha önceden kullanılmıştır ! ";
        return res.json({
            success: false,
            message
        });
    } else{
        return res.json( {
            success: true,
            message: "Kullanıcı başarıyla kaydedilmiştir !"
        })
    }
});
};
//-----------------------------------------------------------------





