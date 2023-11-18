import express from 'express'
import User from '../Models/user.js'

const router = express.Router()

router.get('/', async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json({RESPONSE: users})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})
    }
})

// Will serve as the login Function
router.get('/:username', async (req, res) => {
    try {
        const {username} = req.params
        const {userType} = req.body
        const user = await User.findOne({ userType, username});
        if (user)
            res.status(200).json({ RESPONSE: "User Found", user });
        else
            res.status(404).json({ RESPONSE: "User not found" });
    } catch (error) {
        res.status(500).json({ RESPONSE: error.message });
    }
});

router.post('/', async(req,res)=>{
    try {
        const newUser = await User.create(req.body)
        res.status(200).json({RESPONSE: newUser})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})
    }
})

export default router