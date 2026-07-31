import mongoose,{Schema,Document} from "mongoose";

interface boardInterface extends Document {
    boardname: string,
    boarddescription?:string,
    userID : string,
    isDefault: boolean
}

const schema = new Schema<boardInterface>({
    boardname: {type:String, required:true},
    boarddescription: {type:String, required:true},
    userID : {type:String, required:true},
    isDefault: {type:Boolean, default:false}
})

const boardModel = mongoose.model<boardInterface>("board",schema)

export default boardModel;