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
    return await models.User.findOne({
      where: {
        email: email,
        password: password
      }
    })
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
    secretOrKey   : 'softKitty'
  },
  function (jwtPayload, cb) {
    return models.User.findOneById(jwtPayload.id)
    .then(user => {
      return cb(null, user);
    })
    .catch(err => {
      return cb(err);
    });
  }
));