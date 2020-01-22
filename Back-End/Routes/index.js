const express = require('express');
const router = express.Router();
const passport = require('passport');
const userSevices = require('../Controllers/user');

router.all('/register', userSevices.register);
router.all('/verificationLink', userSevices.sendVerificationLink);
router.all('/verification', userSevices.verification);
router.all('/login', passport.authenticate('local', { session: false }), userSevices.login);
router.post('/logout', userSevices.logout);
router.all('/authenticate', userSevices.authenticate)
router.all('/resetPassword', userSevices.resetPassword);
module.exports = router;