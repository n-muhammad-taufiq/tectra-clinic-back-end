const jwt=require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken=(req,res,next)=>{
    const cookies=req.cookies;
    console.log("Cookies:",cookies);
    console.log(cookies.jwt);
    if(cookies && !cookies.jwt){
        const error=new Error('missing:refreshToken');
        error.code=403;
        next(error,req,res,next);
    }
    const refreshToken=cookies.jwt
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(error,decoded)=>{
        if(error){
            const error=new Error('invalid_token');
            error.code=403;
            next(error,req,res,next);
        }
        console.log('decoded: ',decoded);
        const userId=decoded.userId;
        const userName=decoded.userName;
        const accessToken=jwt.sign({
            userId:userId,
            userName:userName
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5m'});
        res.json({
        status:'success',
        code:200,
        error:null,
        data:{
        accessToken:accessToken
        }
        });
    })
}

module.exports={handleRefreshToken};