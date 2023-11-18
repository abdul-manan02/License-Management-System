import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import licenseRouter from './APIs/license.js'
import productRouter from './APIs/product.js'
import userRouter from './APIs/user.js'


const connectDB = (url) => { return mongoose.connect(url) }


const app = express()
app.use(express.json());


app.use('/LMS/license', licenseRouter)
app.use('/LMS/user', userRouter)
app.use('/LMS/product', productRouter)


const port = process.env.PORT || 5000
const start = async() =>{
    try {
        await connectDB(process.env.LMS_URI)
        app.listen(port, console.log(`LISTENING ON PORT ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()