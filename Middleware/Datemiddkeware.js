const Datemiddleware=(req,res,next)=>{
    try{
        let date=new Date().toISOString()
        req.body.date=date
        next();
    }
    catch(err){
        res.status(400).send({"msg":"err"})
    }
}

module.exports={
    Datemiddleware
}