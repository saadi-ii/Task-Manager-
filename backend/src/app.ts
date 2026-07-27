import express, { Application } from "express"
import cors from "cors"
import columnRoute from "./routes/column.routes"
import taskRoute from "./routes/task.routes"
import subtaskRoute from "./routes/subtask.routes"
import userRouter from "./routes/user.routes"
import boardRouter from "./routes/board.routes"
import cookieParser from "cookie-parser"
import authMiddleware from "./middleware/auth.middleware"

const app: Application = express()


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use("/user", userRouter)
app.use("/board", authMiddleware, boardRouter)
app.use("/column", authMiddleware, columnRoute)
app.use("/task", authMiddleware, taskRoute)
app.use("/subtask", authMiddleware, subtaskRoute)

export default app
