import mongoose, { Document, Schema } from "mongoose"

export interface IColumn extends Document {
    boardid:string,
    columnname: string
}

const columnSchema = new Schema<IColumn>({
    boardid: { type: String, required: true},
    columnname: { type: String, required: true}
})

const columnModel = mongoose.model<IColumn>("column", columnSchema)

export default columnModel
