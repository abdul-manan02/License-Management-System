import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: {
            values: ['Admin', 'User'],
            message: 'User Type {VALUE} is invalid'
        }
    },    
    username:{
        type: String
    },
    password:{
        type: String
    }
})  

const User = mongoose.model('User', userSchema, 'User');

export default User;