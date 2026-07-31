import { Request, Response } from "express"
import taskModel from "../../model/task.model"
import { renewRecurringTasks } from "../../lib/renewRecurringTasks"

export const _get = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId as string

    await renewRecurringTasks(userId)

    const tasks = await taskModel.find({
        userID: userId
    })
    res.status(200).json({ tasks })
}
