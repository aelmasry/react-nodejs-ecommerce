//FILENAME : User.js

const mongoose = require("mongoose"),
    uniqueValidator = require('mongoose-unique-validator');

const crypto = require('crypto');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        unique: true, 
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
}, 
    {timestamps: true}
);

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.virtual('password')
  .set(function (password) {
    this.salt = crypto.randomBytes(32).toString('base64');
    this.password = this.encryptPassword(password, this.salt);
  })
  .get(function () {
    return this.password;
  });

UserSchema.methods.encryptPassword = function (password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
};
UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password, this.salt) === this.password;
};

// export model user with UserSchema
module.exports.userModel = mongoose.model("user", UserSchema);