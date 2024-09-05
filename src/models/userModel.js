import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        // required: [true, 'Password is required']
    },

    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    otp: {
        type: String,
        default: null
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    apiToken: String,
    otpSentAt: Date,
    verifyToken: String,
    verifyTokenExpire: Date,

    licenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'licenses' // Add the ref property here
    }]
});

const User = mongoose?.models?.users || mongoose?.model("users", userSchema);

export default User;