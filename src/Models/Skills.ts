import { Schema, model } from "mongoose";

const SkillsSchema=new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true}
})

export default model("Skills",SkillsSchema)