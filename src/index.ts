import express from 'express'
import {config} from 'dotenv'
import { ConnectMongodb } from './Connection/MongodbConnection'
import { graphqlHTTP } from 'express-graphql'
import schema from "./Handlers/Handler"
import cors from 'cors'
config()
const app=express()
app.use(cors())
app.use('/graphql',graphqlHTTP({schema:schema,graphiql:true}))
const startServer=()=>{
    ConnectMongodb(process.env.MongoDbUrl?process.env.MongoDbUrl:'').then(()=>{
        app.listen(process.env.Port,()=>{
            console.log(`port ${process.env.Port} started`)
        })
    })
}

startServer()