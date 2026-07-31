import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGODB_URI as string
        await mongoose.connect(mongoURI)
    } catch {
        process.exit(1)
    }
}

export default connectDB
