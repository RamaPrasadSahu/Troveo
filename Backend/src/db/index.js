import mongoose from "mongoose"
import DB_NAME from "../db/index.js"

const ConnectDB = async ()=>{
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`Mongo DB Connected  At ${connectioninstance.connection.host}`) 
    } catch (error) {
        console.log("MongoDB Connection Failed",error)
        process.exit(1)
        
    }
}

export default ConnectDB