const userModal = require('../Modals/user');
const lookupModal = require('../Modals/lookup');
const SHA256 = require("crypto-js/sha256");
const emailTemplate = require('../Utils/emailTemplate');
const randomNumber = require('random-number');
const emailSender = require('../Services/emailSender');
const logger = require('../Services/logger');
const notification = require('../Controllers/pushNotification');
const util = require('../Utils/index');
// User registration
register = (req, res) => {
    try {
        if (req.body != null || req.params != null || req.query != null) {
            let data = { ...req.body, ...req.params, ...req.query },
                { firstName, lastName, email, password, allowPramotionEmails } = data,
                response = {};
            userModal.findOne({ $and: [{ email: email, isActive: true, isEmailVerified: true, isDeleted: false }] }, (err, user) => {
                // Generate secret key and registration id
                let secretKey = SHA256('RentersSecretKey'),
                    options = { min: 10000, max: 1000000000, integer: true },
                    registrationId = randomNumber(options);
                if (!err && !user) {
                    lookupModal.findOne({ $and: [{ displayValue: 'Others', isActive: true, isDeleted: false }] }, async (err, lookup) => {
                        if (!err && lookup) {
                            // Create hash password
                            new userModal().hashPassword(password).then(async (hashPassword) => {
                                //Create new user and save
                                let newUser = new userModal({
                                    registrationId: "R-" + registrationId,
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    password: hashPassword,
                                    roleId: lookup._id,
                                    extraEmails: allowPramotionEmails == 'true' ? true : false,
                                    secretKey: secretKey,
                                    secretKeyGeneratedAt: new Date()
                                });
                                await newUser.save().then((inserted, err) => {
                                    if (!err && inserted) {
                                        // pushNotification
                                        notification.pushNotification({
                                            notification: `${inserted.firstName} ${inserted.lastName} has registered.`,
                                            notificationDetails: `UserId ${inserted._id}`,
                                            notificationType: util.notificationTypes.newRegistration
                                        });
                                        // Send Verification link
                                        let template = emailTemplate.AccountVerification,
                                            tags = {
                                                FirstName: inserted.firstName,
                                                LastName: inserted.lastName,
                                                AccountActivationLink: "http://localhost:3000/emailVerification/" + inserted.secretKey
                                            },
                                            option = { to: inserted.email, template, tags };
                                        emailSender.sendEmailNotification(option).then(function (response) {
                                            console.log(response);
                                        }).catch(err => {
                                            console.log(err);
                                        });
                                        response.success = true;
                                        response.message = 'Registration Success. Please verify your email address to activate your account.';
                                        res.status(200).send(response);
                                    } else {
                                        response.success = false;
                                        response.message = 'Registration failed.';
                                    }
                                    res.status(200).send(response);
                                })
                            });

                        } else {
                            response.success = false;
                            response.message = 'Registration failed (User Role not found)';
                            res.status(200).send(response);
                        }
                    })

                } else if (!err && user) {
                    response.success = false;
                    response.message = 'Already registered email.';
                    res.status(200).send(response);
                } else {
                    response.success = false;
                    response.message = err;
                    res.status(200).send(response);
                }
            });
        }
    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
}

// Verify Link
verification = async (req, res) => {
    try {
        if (req.body != null || req.params != null || req.query != null) {
            let data = { ...req.body, ...req.params, ...req.query },
                { secretKey, comingFrom } = data,
                response = {};
            await userModal.findOne({ secretKey: secretKey, secretKeyUsed: false }, async (err, userData) => {
                if (!err && userData) {
                    //Check expired link
                    var currentDate = new Date();
                    var minutes = Math.abs(Math.round(((userData.secretKeyGeneratedAt.getTime() - currentDate.getTime()) / 1000) / 60));
                    if (minutes > 60) {
                        response.success = false;
                        response.message = 'Expired Link';
                        res.status(200).send(response);
                        return
                    }
                    //Create update fields
                    let updateFields = comingFrom == "recovery" ? { secretKeyUsed: true } : { secretKeyUsed: true, isActive: true, isEmailVerified: true };
                    //Update User
                    await userModal.findOneAndUpdate({ $and: [{ email: userData.email, secretKey: secretKey, secretKeyUsed: false, isDeleted: false }] },
                        { $set: updateFields },
                        { new: true }, (err, updatedUser) => {
                            if (err) {
                                response.success = false;
                                response.message = 'verification failed.';
                            } else {
                                response.success = true;
                                response.message = 'verification success.';
                                response.data = updatedUser;
                            }
                        })
                } else if (!err && !userData) {
                    response.success = false;
                    response.message = 'Invalid Link Or Expired Link';
                } else {
                    response.success = false;
                    response.message = 'Something Went Wrong.';
                }
                res.status(200).send(response);
            });
        }
    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
}

// Login
login = (req, res, next) => {
    try {
        let passportResult = req.user,
            response = {};
        //Check passort result
        if (!passportResult.success) {
            res.status(200).send(passportResult);
            return;
        }
        // Check Passport Authentication
        if (req.isAuthenticated()) {
            let userData = passportResult.userData;
            // Delete Password
            delete userData["password"];
            //Login User and set session
            req.login(userData, function (err) {
                if (err) return next(err);
                req.session.userData = userData;
                response.success = true;
                response.data = userData;
                response.message = 'Login success.';
                res.status(200).send(response);
            });
        } else {
            response.success = false;
            response.data = [];
            response.message = 'Login failed.';
            res.status(401).send(response);
        }
    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
}

// Authentication
authenticate = async (req, res) => {
    try {
        let response = {};
        if (req.session && req.session.userData) {
            response.success = true;
            response.data = req.session.userData;
            res.status(200).send(response);
        } else {
            response.success = false;
            response.data = [];
            res.status(200).send(response);
        }
    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
}

// logout
logout = async (req, res) => {
    try {
        if (req.session && req.session.userData) {
            await req.session.destroy(async (err) => {
                if (err) return next(err)
                await req.logout();
                res.clearCookie("user_sid")
                return res.status(200).json({ success: true, message: "Logout success" });
            })
        }
    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
}

// Send Verification Link
sendVerificationLink = async (req, res) => {
    try {
        if (req.body != null || req.params != null || req.query != null) {
            let data = { ...req.body, ...req.params, ...req.query },
                { email } = data,
                response = {};
            // Search user
            await userModal.findOne({ $and: [{ email: email, isActive: true, isEmailVerified: true, isDeleted: false }] }, async (err, user) => {
                if (!err && user) {
                    // Create secret key and update user
                    let secretKey = SHA256('RentersSecretKey'),
                        update = {
                            secretKey: secretKey,
                            secretKeyUsed: false,
                            secretKeyGeneratedAt: new Date()
                        }
                    await userModal.findOneAndUpdate({ _id: user._id }, update, { new: true }, (err, affectedUser) => {
                        if (!err && affectedUser) {
                            // Send Verification Link
                            let template = emailTemplate.ResetPassword,
                                tags = {
                                    FirstName: affectedUser.firstName,
                                    LastName: affectedUser.lastName,
                                    AccountRecoveryLink: "http://localhost:3000/recovery/" + affectedUser.secretKey
                                },
                                option = { to: affectedUser.email, template, tags };
                            emailSender.sendEmailNotification(option).then(function (response) {
                                console.log(response);
                            }).catch(err => {
                                console.log(err);
                            });
                            response.success = true;
                            response.message = 'We have sent a account recovery link on your registered email.';
                        } else if (err) {
                            response.success = false;
                            response.message = err;
                        }
                    });
                } else if (!err && !user) {
                    response.success = false;
                    response.message = "Email address has not any associated renters account.";
                } else {
                    response.success = false;
                    response.message = err;
                }
                res.status(200).send(response);
            });
        }
    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
}

//Reset Password
resetPassword = async (req, res) => {
    try {
        if (req.body != null || req.params != null || req.query != null) {
            let data = { ...req.body, ...req.params, ...req.query },
                { email, password } = data,
                response = {};
            //Search User
            await userModal.findOne({ $and: [{ email: email, isActive: true, isEmailVerified: true, isDeleted: false }] }, async (err, user) => {
                if (!err && user) {
                    //Generate Hash Password
                    new userModal().hashPassword(password).then(async (hashPassword) => {
                        //Reset Password
                        await userModal.findOneAndUpdate({ email: email },
                            { $set: { password: hashPassword } },
                            { new: true }, (err, updatedUser) => {
                                if (!err) {
                                    response.success = true;
                                    response.message = "Account reset success.";
                                } else {
                                    response.success = false;
                                    response.message = "Account reset failed.";
                                }
                                res.status(200).send(response);
                            });
                    });
                } else if (!err && !user) {
                    response.success = false;
                    response.message = "Associated account not found."
                    res.status(200).send(response);
                } else {
                    response.success = false;
                    response.message = err;
                    res.status(200).send(response);
                }
            });
        }
    } catch (error) {
        logger.log({
            level: 'info',
            message: error
        });
    }
}

module.exports = {
    register,
    login,
    authenticate,
    logout,
    verification,
    sendVerificationLink,
    resetPassword
}