import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userrouters from './router/userRoutes.js'
import productroutes from './router/productRoutes.js'




const app  = express ()
dotenv.config();

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/ping",(req,res)=>{
    res.send("Server is set up and running")
})

app.use("/api/users",userrouters)
app.use("/api/products",productroutes)

export default app;




