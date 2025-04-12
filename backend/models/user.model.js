import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        // lowercase: true,
        minLength: [ 3, 'Username must be at least 3 characters long' ],
        maxLength: [ 20, 'Username must not be longer than 20 characters' ]
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [ 6, 'Email must be at least 6 characters long' ],
        maxLength: [ 50, 'Email must not be longer than 50 characters' ]
    },

    password: {
        type: String,
        select: false,
    },
    profileImage:{
        type: String,
        required: true,
    },
    socketId: {
        type: String,
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
      
    },
    notifications: [
        {
            message: String,
            date: { type: Date, default: Date.now },
            expireAt: { type: Date, default: () => Date.now() + 3 * 24 * 60 * 60 * 1000 }, // 3 days from creation
        }
    ],

    upcomingBookings: [
        {
            _id: String,
            date: String,
            time: String,
            service: String,
            walker: String,
            status: String,
            expireAt: { type: Date, default: () => Date.now() + 3 * 24 * 60 * 60 * 1000 }, // 3 days from creation
        }
    ],

    dog: {
        dogname: {
            type: String,
            required: true,
            trim: true,
        },
       
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female'],
        },
        breed: {
            type: String,
            required: true,
            trim: true,
        },
        dogSize: {
            type: String,
            required: true,
            enum: ['Small', 'Medium', 'Large'],
        },
        description: {
            type: String,
            trim: true,
            maxLength: [200, 'Description must not be longer than 200 characters'],
        },
    
    },
})

// Ensure TTL index is created for notifications
userSchema.index({ "notifications.expireAt": 1 }, { expireAfterSeconds: 0 });

// Ensure TTL index is created for upcomingBookings
userSchema.index({ "upcomingBookings.expireAt": 1 }, { expireAfterSeconds: 0 });

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}


const User = mongoose.model('user', userSchema);

export default User;