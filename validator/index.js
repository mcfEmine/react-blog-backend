module.exports.createPostValid= (req,res, next) => {
    req.check("title", "Baslik girilmelidir!").notEmpty();
    req.check("title", "Baslik 4-150 karakter arasinda olmalı!").isLength({
        min:4,
        max:150
    });

    req.check("body", "Metin girilmeldir!").notEmpty();
    req.check("body", "Metin 4-2000 karakter arasinda olmalı!").isLength({
        min:4,
        max:2000
    });

    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map(error=>error.msg)[0]; // ilk satırdaki
        return res.status(400).json({error:firstError}) ;
    }
    next(); // bir sonraki middleware git!

};