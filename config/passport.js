const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/db');

// To authtenticate the User by JWT Startegy
module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    console.log("***************************************************************************")
    console.log("PASSPORT A GELDI.....");

    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("EXTRACT JWT, JWT_PAYLOAD_DATA" , jwt_payload.data._id);

            User.getUserById(jwt_payload.data._id, (err, user) => {
                if (err) return done(err, false);
                if (user) return done(null, user);
                return done(null, false);
            });
            console.log("PASSPORT USER BULDU " , user.body);
        
    }));
    console.log("***************************************************************************")
}


