const { Router } = require("express");

const router = Router();

const {renderSignUpForm, renderSigninForm, signup, signin, logout} = require('../controllers/users');

router.get('/signup', renderSignUpForm);
router.post('/signup', signup);

router.get('/signin', renderSigninForm);
router.post('/signin', signin);

router.get('/logout', logout);

module.exports = router;