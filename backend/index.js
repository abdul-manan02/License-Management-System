import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'

const connectDB = (url) => { return mongoose.connect(url) }

const app = express()
app.use(express.json());
app.use('/LMS', )

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