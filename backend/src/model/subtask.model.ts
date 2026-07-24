import mongoose, { Document, Schema } from "mongoose"

export interface ISubtask extends Document {
    taskid: string
    subtaskname: string
    userID:string
    priority?: string
    date?: string
}

const subtaskSchema = new Schema<ISubtask>({
    taskid:{ type: String, required:true },
    subtaskname:{ type: String, required: true },
    userID:{ type: String, required: true },
    priority:{ type: String },
    date:{ type: String }
})

const subtaskModel = mongoose.model<ISubtask>("subtask", subtaskSchema)

export default subtaskModel
