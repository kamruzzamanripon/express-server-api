const mongoose = require('mongoose');
//const crypto = require('crypto')

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    email: {
        type: String,
        reqired: true
    },
    phone: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    resetPassword: {
        type: Boolean,
        required: false,
        default: false
    },
    resetPasswordToken: {
        type: String,
        required: false,
        default: null
    },
    resetPasswordExpire: {
        type: Date,
        required: false,
        default: null
    }
},{ timestamps: true, versionKey:false })


const User = mongoose.model('User', DataSchema, 'users');
module.exports = User;