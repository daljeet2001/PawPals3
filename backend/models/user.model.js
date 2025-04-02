
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

    dog: {
        dogname: {
            type: String,
            required: true,
            trim: true,
        },
        image:{
            type:String,
            default:"https://dogacademy.org/blog/wp-content/uploads/2023/10/pocket-bully-on-grass.jpg"
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