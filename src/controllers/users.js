const usersCtrl = {};

const User = require('../models/User');

const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) =>{
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    let errors = [];
    const {username, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({
            text: 'Las contraseñas no son exactamente iguales'
        })
    }
    if(password.length < 4){
        errors.push({
            text: 'La contraseña debería de al menos tener 4 caracteres'
        })
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            username,
            email
        });
    }else{
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash("error_msg", "Ya hay un usuario usando este email");
            res.redirect("/signup");
        }else{
            const newUser = new User({username, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "Registro exitoso");
            res.redirect('/');

        }
    }
};

usersCtrl.renderSigninForm = (req, res) =>{
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/',
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Hasta pronto');
    res.redirect('/signin');
};

module.exports = usersCtrl;