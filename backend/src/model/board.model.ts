import mongoose,{Schema,Document} from "mongoose";

interface boardInterface extends Document {
    boardname: string,
    userID : string
}

const schema = new Schema<boardInterface>({
    boardname: {type:String, required:true},
    userID : {type:String, required:true}
})

const boardModel = mongoose.model<boardInterface>("board",schema)

export default boardModel;