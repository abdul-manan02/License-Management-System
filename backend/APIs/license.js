import express from 'express'
import License from '../Models/license.js'
import User from '../Models/user.js'
import Product from '../Models/product.js'

const router = express.Router()

// get all licenses
router.get('/', async(req,res)=>{
    try {
        const licenses = await License.find()
        res.status(200).json({RESPONSE: licenses})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})
    }
})

// get unavailed licenses
router.get('/', async(req,res)=>{
    try {
        const licenses = await License.find({activated: false})
        res.status(200).json({RESPONSE: licenses})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})
    }
})

// get a licenses
router.get('/:licenseKey', async(req,res)=>{
    try {
        const license = await License.find({licenseKey: req.params.licenseKey})
        if(license)
            res.status(200).json({RESPONSE: "License Found", license})
        else
            res.status(400).json({RESPONSE: "License not found"})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})
    }
})

// create license
router.post('/', async(req,res)=>{
    try {
        const {productId} = req.body
        const productDetails = await Product.findOne({_id: productId})
        const modifiedBody = {
            ...req.body,
            product: productDetails
        }
        delete modifiedBody.productId
        
        const newLicense = await License.create(modifiedBody)
        res.json({RESPONSE: newLicense})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})        
    }
})

// will serve as user registering for a license
router.patch('/:licenseKey', async(req,res)=>{
    try {
        const existingLicense = await License.findOne({ licenseKey: req.params.licenseKey });
        if( existingLicense.activated != true)
        {
            const userDetails = await User.findOne({username: req.body.username})
            const {_id, username} = userDetails
            const updatedUserDetails = {_id, username}
            const updatedLicense = await License.findOneAndUpdate(
                { licenseKey: req.params.licenseKey },
                { 
                    user: updatedUserDetails,
                    activated: true // or any value you desire to set
                },
                { new: true }
            );
            res.status(200).json({RESPOSNE: updatedLicense})
        }
        else
            res.status(200).json({RESPOSNE: "License is already activated by a user"})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})        
    }
})

export default router