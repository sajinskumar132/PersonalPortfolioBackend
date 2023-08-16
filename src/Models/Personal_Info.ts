import { Schema,model } from "mongoose";

const PersonalInfoSchema=new Schema({
    name:{type:String,required:true},
    emailId:{type:String,required:true},
    Position:{type:String,required:true},
    Description:{type:String,required:true},
    Resume:{type:String,required:true},
    linkedinId:{type:String,required:true}
})

export default model('PersonalInfo',PersonalInfoSchema)