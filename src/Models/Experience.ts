import { Schema,model } from "mongoose";

const ExperienceSchema=new Schema({
    CompanyName:{type:String,required:true},
    Posting:{type:String,required:true},
    StartDate:{type:String,required:true},
    EndDate:{type:String,required:true},
    Summary:{type:String,required:true},
    TaskOrResponsnibility:[{type:String,required:true}]
})

export default model("Experiences",ExperienceSchema)