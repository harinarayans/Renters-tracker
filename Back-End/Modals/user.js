const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Defining ENUMs for the gender field which will use for validation.
var genders = 'Male Female'.split(' ')

//create a schema
const usersSchema = new Schema({
    registrationId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: genders
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    secretKey: {
        type: String
    },
    secretKeyGeneratedAt: {
        type: Date
    },
    secretKeyUsed: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Lookup',
        required: true,
    },
    extraEmails: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

// User methods
usersSchema.methods.hashPassword = function (password) {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (!err) return resolve(hash);
                });
            });
        } catch (err) {
            reject(err);
        }
    })
}

usersSchema.methods.verifyPassword = function (password, hash) {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.compare(password, hash, function (err, res) {
                if (!err) return resolve(res);
                else reject(err);
            });
        } catch (err) {
            reject(err);
        }
    })
}

const User = mongoose.model('User', usersSchema, 'User');

//Export the model
module.exports = User;