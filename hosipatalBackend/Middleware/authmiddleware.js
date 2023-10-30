const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
       const token=req.headers.authorization
       console.log(token)
       try{
        if(token){
            jwt.verify(token, 'masai', function(err, decoded) {
                if(decoded){
                    console.log()
                    next()
                }
              });
           }else{
            res.status(200).send({'msg':'You are not Authorized!'})
           }
       }
       catch(err){
        res.status(400).send({'msg':"err"})
    }
      
}

module.exports={
    auth
}