const JwtStrategy  = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/db');

// To authenticate the User by JWT Strategy
module.exports = (passport) =>{
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy ( opts, (jwt_payload, done) => {
           User.getUserById(jwt_payload.data._id, (err, user) => {
                if(err) return done(err, false);
                if(user) return done (null, user);
                return done(null, false);
           }) ;
    }));
}


//  * past the JWT 
//  * "token": "JWTeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//  * .eyJ0eXBlIjoidXNlciIsImRhdGEiOnsiX2lkIjoiNWQyNDc3ZTAxYTB
//  * lZDkyZTI4ZDk5YTY5IiwidXNlcm5hbWUiOiJrZXpiYW4iLCJuYW1lIjoiS


// my payload data : 
// "type": "user",
// "data": {
//   "_id": "5d2477e01a0ed92e28d99a69",
//   "username": "ıdı",
//   "name": "bıdı",
//   "email": "ıdı@teknopark.com",
//   "contact": "bıdı"
// },
// "iat": 1562673328,
// "exp": 1563278128
// }

