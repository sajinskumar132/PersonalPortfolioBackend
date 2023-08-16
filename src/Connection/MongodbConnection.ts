import { connect } from "mongoose"

export const ConnectMongodb=async(Url:string)=>{
    try {
        await connect(Url).then(()=>{
            console.log('Connected')
        })
    } catch (error) {
        console.log(error)
    }
}