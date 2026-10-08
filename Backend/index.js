import dotenv from "dotenv"
import {app} from "./app.js"
import ConnectDB from "./src/db/index.js"
import dns from "dns"
import { log } from "console"
dns.setServers(['8.8.8.8','1.1.1.1'])
dotenv.config({
    path : './.env'
})

ConnectDB
.then(()=>{
    app.listen(process.env.PORT || 8000., ()=>{
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })  
})
.catch((err)=>{
     console.log("MongoDB Connection Failed !!!",err);
     
})