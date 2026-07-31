import mongoose, { Document, Schema } from "mongoose"

export interface ITask extends Document {
    columnid: string
    columnname: string
    taskname: string
    description:string
    userID:string
    priority?: string
    comment?: string
    date?: string
    recurrence?: "once" | "daily" | "weekly" | "monthly" | "yearly"
}

const taskSchema = new Schema<ITask>({
    columnid:{ type: String, required:true },
    columnname:{ type: String, required: true },
    taskname:{ type: String, required: true },
    description:{ type: String, required: true },
    userID:{ type: String, required:true },
    priority:{ type: String },
    comment:{ type: String },
    date:{ type: String },
    recurrence:{ type: String, enum: ["once", "daily", "weekly", "monthly", "yearly"], default: "once" }
})

const taskModel = mongoose.model<ITask>("task", taskSchema)
export default taskModel
