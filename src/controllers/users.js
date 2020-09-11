const usersCtrl = {};
const passport = require('passport');
const {User, Post} = require('../models');

usersCtrl.renderMeProfile = async (req, res) => {
    const user = req.user;
    const posts = await Post.find({user: req.user._id}).sort({timestamp: -1}).populate('user').lean();
    
    actualUser = req.user;
    res.render('users/profile', {user, posts, actualUser});
    console.log(user, posts);
}

usersCtrl.renderUserProfile = async (req, res) => {
    const user = await User.findOne({username: req.params.username}).lean();
    console.log(user);
    actualUser = req.user;

    res.render('users/profile', {user, actualUser});
}

usersCtrl.renderSignUpForm = (req, res) =>{
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    try {
        let errors = [];
        const {username, email, password, confirm_password} = req.body;
        if(password != confirm_password){
            errors.push({
                text: 'Las contraseñas no son exactamente iguales'
            });
        }
        if(password.length < 4){
            errors.push({
                text: 'La contraseña debería de al menos tener 4 caracteres'
            });
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
                const newUser = new User({
                    username, 
                    email, 
                    password
                });
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save();
                res.redirect('/');
                req.flash("success_msg", "Registro exitoso");
        
            }
        }
    } catch (e) {
        console.log(e);
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