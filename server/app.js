import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'




const app  = express ()
dotenv.config();

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/ping",(req,res)=>{
    res.send("Server is set up and running")
})

export default app;




