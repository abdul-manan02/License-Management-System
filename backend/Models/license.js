import mongoose from "mongoose";

const licenseSchema = new mongoose.Schema({
    licenseKey: {
        type: String,
        required: true,
    },
    product: {
        type: Object,
        required: true,
    },
    user: {
        type: Object,
        default: null
    },
    activated: {
        type: Boolean,
        default: false,
    },
})  

const License = mongoose.model('License', licenseSchema, 'License');

export default License;