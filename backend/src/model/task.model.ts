import mongoose, { Document, Schema } from "mongoose"

export interface ITask extends Document {
    columnid: string
    taskname: string
    userID:string
    priority?: string
    comment?: string
    date?: string
}

const taskSchema = new Schema<ITask>({
    columnid:{ type: String, required:true },
    taskname:{ type: String, required: true },
    userID:{ type: String, required:true },
    priority:{ type: String },
    comment:{ type: String },
    date:{ type: String }
})

const taskModel = mongoose.model<ITask>("task", taskSchema)
export default taskModel
