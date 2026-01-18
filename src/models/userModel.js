import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: true,
        required: [true, 'Password is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

},
    {
        timestamps: true
    });

const User = mongoose.models.User || mongoose.model('User', userSchema); //users is the collection name in the database

export default User;