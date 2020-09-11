const { Router } = require("express");
const router = Router();
const {
    renderSignUpForm, 
    renderSigninForm, 
    renderMeProfile,
    renderUserProfile,
    signup, 
    signin, 
    logout} = require('../controllers/users');
const { isAuthenticated } = require('../helpers/auth');
const User = require('../models/User');


router.get('/me', isAuthenticated, renderMeProfile);
router.get('/:username', isAuthenticated, renderUserProfile);
router.get('/signup', renderSignUpForm);
router.post('/signup', signup);

router.get('/signin', renderSigninForm);
router.post('/signin', signin);

router.get('/logout', logout);

router.get('/api/users', isAuthenticated, async (req, res) => {
    const users = await User.find().lean();
    res.json(users);
    console.log(users);
});

module.exports = router;