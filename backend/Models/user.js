import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({

})

const User = mongoose.model('User', usersSchema, 'User');

export default User;