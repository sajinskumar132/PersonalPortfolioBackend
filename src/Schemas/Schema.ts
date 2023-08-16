import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const PersonalInfoType=new GraphQLObjectType({
    name:"PersonalInfoType",
    fields:()=>(
        {
            id:{type:new GraphQLNonNull(GraphQLID)},
            name:{type:new GraphQLNonNull(GraphQLString)},
            emailId:{type:new GraphQLNonNull(GraphQLString)},
            Position:{type:new GraphQLNonNull(GraphQLString)},
            Description:{type:new GraphQLNonNull(GraphQLString)},
            Resume:{type:new GraphQLNonNull(GraphQLString)},
            linkedinId:{type:new GraphQLNonNull(GraphQLString)}
        }
    )
})

export const SkillsType=new GraphQLObjectType({
    name:"SkillsType",
    fields:()=>(
        {
            id:{type:new GraphQLNonNull(GraphQLID)},
            name:{type:new GraphQLNonNull(GraphQLString)},
            image:{type:new GraphQLNonNull(GraphQLString)}
           
        }
    )
})

export const Experiencetype=new GraphQLObjectType({
    name:"ExperienceType",
    fields:()=>(
        {
            id:{type:new GraphQLNonNull(GraphQLID)},
            CompanyName:{type:new GraphQLNonNull(GraphQLString)},
            Posting:{type:new GraphQLNonNull(GraphQLString)},
            StartDate:{type:new GraphQLNonNull(GraphQLString)},
            EndDate:{type:new GraphQLNonNull(GraphQLString)},
            Summary:{type:new GraphQLNonNull(GraphQLString)},
            TaskOrResponsnibility:{type:new GraphQLNonNull(new GraphQLList(GraphQLString))}
        }
    )
})

export const ProjectType=new GraphQLObjectType({
    name:"ProjectType",
    fields:()=>(
        {
            id:{type:new GraphQLNonNull(GraphQLID)},
            name:{type:new GraphQLNonNull(GraphQLString)},
            TechStack:{type:new GraphQLNonNull( new GraphQLList(GraphQLString))},
            Summary:{type:new GraphQLNonNull(GraphQLString)},
            Description:{type:new GraphQLNonNull( new GraphQLList(GraphQLString))},
            Url:{type:new GraphQLNonNull(GraphQLString)}
        }
    )
})

export const EmailType=new GraphQLObjectType({
    name:"EmailType",
    fields:()=>({
        fromEmail:{type:new GraphQLNonNull(GraphQLString)},
        Subject:{type:new GraphQLNonNull(GraphQLString)},
        MailText:{type: new GraphQLNonNull(GraphQLString)}
    })
})