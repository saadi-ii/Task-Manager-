import connectDB from "./src/db/db"
import app from "./src/app"
import dotenv from "dotenv"

dotenv.config()

connectDB()

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
