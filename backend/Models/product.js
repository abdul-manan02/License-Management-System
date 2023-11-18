import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})  

const Product = mongoose.model('Product', productSchema, 'Product');

export default Product;