import express from 'express'
import License from '../Models/license.js'
import User from '../Models/user.js'
import Product from '../Models/license.js'

const router = express.Router()

router.get('/login/:username', async(req,res)=>{
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user)
            res.status(200).json({ RESPONSE: "User Found", user });
        else
            res.status(404).json({ RESPONSE: "User not found" });
    } catch (error) {
        res.status(500).json({ RESPONSE: error.message });
    }
})



export default router