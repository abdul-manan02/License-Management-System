import express from 'express'
import Product from '../Models/product.js'

const router = express.Router()

router.get('/', async(req,res)=>{
    try {
        const products = await Product.find()
        res.status(200).json({RESONSE: products})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})
    }
})

router.post('/', async(req,res)=>{
    try {
        const newProduct = await Product.create(req.body)
        res.status(200).json({RESPONSE: newProduct})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})
    }
})

router.get('/:name', async(req,res)=>{
    try {
        const {name} = req.params
        const product = await Product.findOne({name})
        if(product)
            res.status(200).json({RESPONSE: "Product Found", product})
        else
            res.status(400).json({RESPONSE: "Product not found"})
    } catch (error) {
        res.status(400).json({RESPONSE: error.message})
    }
})



export default router