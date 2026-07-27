import mongoose,{Document,Schema} from "mongoose";


export interface signUp extends Document {
    username : string,
    email : string,
    password : string
}

const signUpSchema = new Schema<signUp>({
    username : {type:String, required:true, unique:true},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true}
})

const signUpModel = mongoose.model<signUp>("user",signUpSchema)

export default signUpModel