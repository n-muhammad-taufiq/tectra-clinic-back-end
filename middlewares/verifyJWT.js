const jwt=require('jsonwebtoken');
require('dotenv').config();

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer '))
    {
        const error=new Error('missing:token');
        error.code=401;
        return next(error,req,res,next);
    }
    const token=authHeader.split(' ')[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            const error=new Error('invalid_token');
            error.code=403;
            return next(error,req,res,next);
        }
        console.log('decoded: ',decoded);
        req.userId=decoded.userId;
        req.userName=decoded.userName;
        next();
    });
}

module.exports=verifyJWT;