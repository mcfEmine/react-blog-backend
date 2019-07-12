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
                message: "Kullanıcı tanımlı değildir. Lütfen kayıt olunuz."
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

exports.registerProfile = (req, res) => {
    let newUser = new User(req.body);
    User.addUser(newUser, (err, user) => {
    if(err) {
        let message = ""
        if(err.errors.username) message= "Kullanıcı daha önceden yaratılmıştır ! ";
        if(err.errors.email) message += " Email daha önceden kullanılmıştır ! ";
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
