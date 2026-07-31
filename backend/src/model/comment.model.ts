import mongoose, { Document, Schema } from "mongoose"

export interface IComment extends Document {
    taskid: string
    userID: string
    username: string
    text: string
    createdAt: Date
}

const commentSchema = new Schema<IComment>({
    taskid: { type: String, required: true },
    userID: { type: String, required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const commentModel = mongoose.model<IComment>("comment", commentSchema)
export default commentModel
