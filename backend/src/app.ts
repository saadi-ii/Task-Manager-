import express, { Application } from "express"
import cors from "cors"
import columnRoute from "./routes/column.routes"
import taskRoute from "./routes/task.routes"
import subtaskRoute from "./routes/subtask.routes"
import userRouter from "./routes/user.routes"
import boardRouter from "./routes/board.routes"
import commentRouter from "./routes/comment.routes"
import cookieParser from "cookie-parser"
import authMiddleware from "./middleware/auth.middleware"
import connectDB from "./db/db"

const app: Application = express()

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use(async (_req, _res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    next(err as Error)
  }
})


app.use("/user", userRouter)
app.use("/board", authMiddleware, boardRouter)
app.use("/column", authMiddleware, columnRoute)
app.use("/task", authMiddleware, taskRoute)
app.use("/subtask", authMiddleware, subtaskRoute)
app.use("/comment", authMiddleware, commentRouter)

export default app
