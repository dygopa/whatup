const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    // passwordField: 'password'
}, async (email, password, done) => {

    //Confirmar si coincide el email del usuario
    const user = await User.findOne({email});
    if(!user){
        return done(null, false, {
            message: 'No conocemos a nadie con ese email'
        });
    }else{
        //Confirmar si las contraseñas coinciden
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        }else{
            return done(null, false, {
                message: 'Estas seguro que es la contraseña correcta?'
            });
        }
    }
    
}));

passport.serializeUser((user, done) =>{
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
        done(err, user);
    }).lean();
});