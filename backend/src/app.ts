import express, { Application } from "express"
import cors from "cors"
import columnRoute from "./routes/column.routes"
import taskRoute from "./routes/task.routes"
import subtaskRoute from "./routes/subtask.routes"
import signUpRouter from "./routes/signup.routes"
import boardRouter from "./routes/board.routes"
import cookieParser from "cookie-parser"

const app: Application = express()


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())


app.use("/signup", signUpRouter)
app.use("/board", boardRouter)
app.use("/column", columnRoute)
app.use("/task", taskRoute)
app.use("/subtask", subtaskRoute)

export default app
