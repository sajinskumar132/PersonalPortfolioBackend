import { Schema,model } from "mongoose";

const ProjectsSchema=new Schema({
    name:{type:String,require:true},
    TechStack:[{type:String,require:true}],
    Summary:{type:String,require:true},
    Description:[{type:String,require:true}],
    Url:{type:String,require:true}
})

export default model('Projects',ProjectsSchema)