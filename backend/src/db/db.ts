import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

let cachedPromise: Promise<typeof mongoose> | null = null

const connectDB = (): Promise<typeof mongoose> => {
    if (!cachedPromise) {
        const mongoURI = process.env.MONGODB_URI as string
        cachedPromise = mongoose.connect(mongoURI).catch((err) => {
            cachedPromise = null
            throw err
        })
    }
    return cachedPromise
}

export default connectDB
