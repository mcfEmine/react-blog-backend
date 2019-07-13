module.exports.createUserValid= (req,res, next) => {

    req.check("name", "Ad, girilmelidir !").notEmpty();
    req.check("name", "Ad, 4-20 karakter arasinda olmalıdır!").isLength({
        min:4,
        max:20
    });

    req.check("username", "Kullanıcı adı, girilmelidir !").notEmpty();
    req.check("username", "Kullanıcı adı, 4-20 karakter arasinda olmalıdır!").isLength({
        min:4,
        max:20
    });

    req.check("password", "Password, girilmelidir !").notEmpty();
    req.check("password", "Password, 5-20 karakter arasinda olmalıdır!").isLength({
        min:5,
        max:20
    });

    req.check("email", "E_posta, girilmelidir !").notEmpty();
    req.check("email", "E_posta, 5-20 karakter arasinda olmalıdır!").isLength({
        min:5,
        max:20
    });


    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map(error=>error.msg)[0]; // ilk satırdaki mesaj yeterlidir
        return res.status(400).json({
            success: false,
            message:firstError
        
        }) ;
    }
    next(); // bir sonraki middleware git!
};


