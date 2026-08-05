import userModel from "../../model/user.model"
import { Request, Response } from "express"
import taskModel from "../../model/task.model";
import subtaskModel from "../../model/subtask.model";
import dotenv from 'dotenv';
dotenv.config()


export const _getno = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string
    try {
        const user = await userModel.findOne({
            _id: userId
        })
        if (!user) {
            res.status(401).json({ message: "Incorrect cookie" })
            return
        }
        const tasks = await taskModel.find({
            userID: userId
        })
        const subtask = await subtaskModel.find({
            userID: userId
        })

        let todo = 0;
        let progress = 0;
        let completed = 0;
        for (const key of tasks) {
            if (key.columnname === "TO DO") {
                todo++
            }
            if (key.columnname === "In Progress") {
                progress++
            }
            if (key.columnname === "Completed") {
                completed++
            }
        }
        for (const key of subtask) {
            const taskkey = tasks.find(t => t._id.toString() === key.taskid);
            if (taskkey && taskkey.columnname === "TO DO") {
                todo++
            }
            if (taskkey && taskkey.columnname === "In Progress") {
                progress++
            }
            if (taskkey && taskkey.columnname === "Completed") {
                completed++
            }
        }

        res.status(200).json({
            todo: todo,
            progress: progress,
            completed: completed
        })
    } catch {
        res.status(500).json({ message: "Internal server error" })
    }
}