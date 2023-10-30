const express=require("express")

const {AppointmentModel}=require("../Model/doctorModel")
const {Datemiddleware}=require("../Middleware/Datemiddkeware")
const {UserModel} =require("../Model/userModel")

const docterRoute=express.Router()

docterRoute.post("/appointments",Datemiddleware,async(req,res)=>{
    try{
        const appointment=new AppointmentModel(req.body)
        await appointment.save()
        res.status(200).send({"msg":"New Appointmnet saved"})
    }
    catch(err){
        res.status(400).send({"msg":"err"})
    }
})


docterRoute.get("/appointments",async(req,res)=>{
    let filter={}
    let sort={}
    let page=parseInt(req.query.page) || 1;
    let limit=parseInt(req.query.limit);

    if(req.query.specialization){
        filter.specialization=req.query.specialization
    }
    if(req.query.sort){
        if(req.query.sort==="asc"){
            sort.date=1
        }
        if(req.query.sort==="desc"){
            sort.date=-1
        }
    }
    if(req.query.search){
        filter.name={$regex:`${req.query.search}`,$options:"i"}
    }
    console.log(filter,sort)
    try{
        const appointments=await AppointmentModel.find(filter).sort(sort).skip((page-1)*limit).limit(limit)
        res.status(200).send(appointments)
    }
    catch(err){
        res.status(400).send({"msg":"err"})
    }
})


docterRoute.delete("/appointments/delete/:id",async(req,res)=>{
    let {id}=req.params;
    console.log(id)
    try{
        const found=await AppointmentModel.findById(id)
        if(found){
            await AppointmentModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"Appointment Delete Successfully"})

        }
        else{
            res.status(200).send({"msg":"Appointment is Not Found"})
        }
    }
    catch(err){
        res.status(200).send({"msg":"err"})
    }
})

module.exports={
    docterRoute
}