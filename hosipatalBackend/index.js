const express=require('express')
require('dotenv').config()
const app=express()
const PORT=8080
const cors=require('cors')
const connection=require('./db')
const { userRouter } = require('./Router/userRouter')
const {docterRoute}=require("./Router/doctorRoutes")

app.use(cors())
app.use(express.json())
app.use('/users',userRouter)
app.use('/appointments',docterRoute)


app.get('/',(req,res)=>{
    res.status(200).send('<h1>Welcome to Masai Hosipatal Backend!</h1>')
})



app.listen(PORT,async()=>{
   
    try{
        await connection
        console.log('server is running in port 8080')
        console.log('Connected to DB')
    }
    catch(err){
        console.log(err)
    }

    
    
})