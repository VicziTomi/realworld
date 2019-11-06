const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  async (email, password, cb) => {
    return await models.User.findOne({email, password}) //TODO finish db query!
    .then(user => {
      if (!user) {
        return cb(null, false, {message: 'Incorrect email or password.'});
      }
      return cb(null, user, {message: 'Logged In Successfully'});
    })
    .catch(err => cb(err));
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
  },
  function (jwtPayload, cb) {
    //find the user in db if needed
    return models.User.findOneById(jwtPayload.id)
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
  }
));