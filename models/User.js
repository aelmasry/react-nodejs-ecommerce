//FILENAME : User.js

const mongoose = require("mongoose"),
    crypto = require('crypto'),
    uniqueValidate = require('mongoose-unique-validator');

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
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        // required: true
    }
}, 
    {timestamps: true}
);

//uniqueValidator
UserSchema.plugin(uniqueValidate, { message: 'That {PATH} is already taken.' });


UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = crypto.randomBytes(32).toString('base64');
    this.hashed_password = this.encryptPassword(password, this.salt);
  }).get(function() {
    return this._password;
  });

UserSchema.methods.encryptPassword = function (password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
};


UserSchema.methods.checkPassword = function (password) {
    return this.encryptPassword(password, this.salt) === this.password;
};

// export model user with UserSchema
module.exports = mongoose.model("userModel", UserSchema);