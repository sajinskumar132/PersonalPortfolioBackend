import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { EmailType, Experiencetype, PersonalInfoType, ProjectType, SkillsType } from "../Schemas/Schema";
import Personal_Info from "../Models/Personal_Info";
import { startSession } from "mongoose";
import Skills from "../Models/Skills";
import Experience from "../Models/Experience";
import Projects from "../Models/Projects";
import nodemailer from "nodemailer"
const Rootquery=new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        Personalinfo:{
            type:new GraphQLList(PersonalInfoType),
            async resolve(){
                return await Personal_Info.find()
            }
        },
        Skills:{
            type:new GraphQLList(SkillsType),
            async resolve(){
                return await Skills.find()
            }
        },
        Experience:{
            type:new GraphQLList(Experiencetype),
            async resolve(){
                return await Experience.find()
            }
        },
        Projects:{
            type: new GraphQLList(ProjectType),
            async resolve(){
                return await Projects.find()
            }
        }
    }
})

const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        //Personal Info
        CreatePersonalInfo:{
            type:PersonalInfoType,
            args:{
            name:{type:new GraphQLNonNull(GraphQLString)},
            emailId:{type:new GraphQLNonNull(GraphQLString)},
            Position:{type:new GraphQLNonNull(GraphQLString)},
            Description:{type:new GraphQLNonNull(GraphQLString)},
            Resume:{type:new GraphQLNonNull(GraphQLString)},
            linkedinId:{type:new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,{name,emailId,Position,Description,Resume,linkedinId}){
                try {
                    let newInfo=new Personal_Info({name:name,emailId:emailId,Position:Position,Description:Description,Resume:Resume,linkedinId:linkedinId})
                    return await newInfo.save()
                } catch (error) {
                    console.log(error)
                } 
            }
        },
        UpdatePersonalInfo:{
            type:PersonalInfoType,
            args:{
            id:{type:new GraphQLNonNull(GraphQLID)},
            name:{type:new GraphQLNonNull(GraphQLString)},
            emailId:{type:new GraphQLNonNull(GraphQLString)},
            Position:{type:new GraphQLNonNull(GraphQLString)},
            Description:{type:new GraphQLNonNull(GraphQLString)},
            Resume:{type:new GraphQLNonNull(GraphQLString)},
            linkedinId:{type:new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,{id,name,emailId,Position,Description,Resume,linkedinId}){
                return await Personal_Info.findByIdAndUpdate(id,{
                    name:name,emailId:emailId,Position:Position,Description:Description,Resume:Resume,linkedinId:linkedinId
                },{new:true})

            }
        },
        //Skill
        createSkills:{
            type:SkillsType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                image:{type:new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,{name,image}){
                const session= await startSession()
                try {
                    session.startTransaction({session})
                    let newSkill=new Skills({name:name,image:image})
                    return await newSkill.save()
                } catch (error) {
                    console.log(error)
                } finally{
                    await session.commitTransaction()
                }
            }
        },

        DeleteSkill:{
            type:SkillsType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent,{id}){
                try {
                    let exisingskills= await Skills.findById(id)
                    if(!exisingskills) return new Error("Skill not found")
                    return await Skills.findByIdAndRemove(id)
                } catch (error) {
                    console.log(error)
                } 
            }

        },
        //Experiences
        CreateExperience:{
            type:Experiencetype,
            args:{
                CompanyName:{type:new GraphQLNonNull(GraphQLString)},
                Posting:{type:new GraphQLNonNull(GraphQLString)},
                StartDate:{type:new GraphQLNonNull(GraphQLString)},
                EndDate:{type:new GraphQLNonNull(GraphQLString)},
                Summary:{type:new GraphQLNonNull(GraphQLString)},
                TaskOrResponsnibility:{type:new GraphQLNonNull(new GraphQLList(GraphQLString))}
            },
            async resolve(Parent,{CompanyName,StartDate,EndDate,Summary,TaskOrResponsnibility,Posting}){
                try {
                    let newExperience=new Experience({CompanyName,StartDate,EndDate,Summary,TaskOrResponsnibility,Posting})
                    return await newExperience.save()
                } catch (error) {
                    console.log(error)
                }
            }
        },
        UpdateExperience:{
            type:Experiencetype,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)},
                CompanyName:{type:new GraphQLNonNull(GraphQLString)},
                Posting:{type:new GraphQLNonNull(GraphQLString)},
                StartDate:{type:new GraphQLNonNull(GraphQLString)},
                EndDate:{type:new GraphQLNonNull(GraphQLString)},
                Summary:{type:new GraphQLNonNull(GraphQLString)},
                TaskOrResponsnibility:{type:new GraphQLNonNull(new GraphQLList(GraphQLString))}
            },
            async resolve(parent,{id,CompanyName,StartDate,EndDate,Summary,TaskOrResponsnibility,Posting}){
                try {
                     const existingId=await Experience.findById(id)
                     if(!existingId) return new Error('Experience not found')
                     return await Experience.findByIdAndUpdate(id,{CompanyName,StartDate,EndDate,Summary,TaskOrResponsnibility,Posting},{new:true})
                } catch (error) {
                    console.log(error)
                }
            }
        },
        DeleteExperience:{
            type:Experiencetype,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)},
            },
            async resolve(parent,{id}){
                try {
                let ExistingUser= await Experience.findById(id)
                if(!ExistingUser) return new Error("Experince with this id not found")
                return await Experience.findOneAndRemove(id)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        //Projects
        CreateProject:{
            type:ProjectType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                TechStack:{type:new GraphQLNonNull( new GraphQLList(GraphQLString))},
                Summary:{type:new GraphQLNonNull(GraphQLString)},
                Description:{type:new GraphQLNonNull( new GraphQLList(GraphQLString))},
                Url:{type:new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,{name,TechStack,Description,Url,Summary}){
                try {
                    let newProject=new Projects({name,TechStack,Description,Url,Summary})
                    return await newProject.save()
                } catch (error) {
                    console.log(error)
                }
            }
        },//64c2cce56f6ac10484bfbbae
        UpdateProject:{
            type:ProjectType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)},
                name:{type:new GraphQLNonNull(GraphQLString)},
                TechStack:{type:new GraphQLNonNull( new GraphQLList(GraphQLString))},
                Summary:{type:new GraphQLNonNull(GraphQLString)},
                Description:{type:new GraphQLNonNull( new GraphQLList(GraphQLString))},
                Url:{type:new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,{id,name,TechStack,Description,Url,Summary}){
                try {
                    let existingId=await Projects.findById(id)
                    if(!existingId) return new Error('ID not found')
                    return await Projects.findByIdAndUpdate(id,{name,TechStack,Description,Url,Summary},{new:true})
                } catch (error) {
                    console.log(error)
                }
            }
        },//64c2cce56f6ac10484bfbbae
        DeleteProject:{
            type:ProjectType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLID)},
            },
            async resolve(parent,{id}){
                try {
                    let existingId=await Projects.findById(id)
                    if(!existingId) return new Error('ID not found')
                    return await Projects.findOneAndRemove(id)
                } catch (error) {
                    console.log(error)
                }
            }
        },

        SendEmail:{
            type:EmailType,
            args:{
                fromEmail:{type:new GraphQLNonNull(GraphQLString)},
                Subject:{type:new GraphQLNonNull(GraphQLString)},
                MailText:{type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,{fromEmail,Subject,MailText}){
                try {
                     
                   const Transport= nodemailer.createTransport({
                    service: 'Gmail',
                        auth: {
                        user: 'sajinskumar39@gmail.com',
                        pass: 'Sajin73561',
                        },
                    })
                    const mailOptions = {
                        from: fromEmail ,
                        to: 'sajinskumar39@gmail.com',
                        subject:Subject,
                        text:MailText,
                      };
                      console.log(mailOptions)
                     await Transport.sendMail(mailOptions)
                     return "Mainsend"
                } catch (error) {
                    console.log(error)
                    return "MainNotsend"
                }
            }
        }
    }

})
export default new GraphQLSchema({query:Rootquery,mutation:Mutation})