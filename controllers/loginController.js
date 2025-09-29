const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const loginModel=require('../models/loginModel');
const refreshTokenModel=require('../models/refreshTokenModel');

const handleLogin=async (req,res,next)=>{
    const {emailAddress,password}=req.body;
    try {
        const data=await loginModel.getUser(emailAddress);
        if(!data){
            const error=new Error('user not found');
            error.code=404;
            return next(error,req,res,next);
        }
        const passwordHash=data.password_hash;
        const isPasswordMatch=await bcrypt.compare(password,passwordHash);
        
        if(!isPasswordMatch){
            const error=new Error('invalid_password');
            error.code=401;
            return next(error,req,res,next);
        }
        
        const accessToken=jwt.sign({
            userId:data.id,
            userName:data.user_name
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'5m'});

       const refreshToken=jwt.sign({
            userId:data.id,
            userName:data.user_name
        },process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'});

        await refreshTokenModel.storeRefreshToken(data.id,refreshToken);

        res.cookie('jwt',refreshToken,{
        httpOnly:true,
        maxAge:24*60*60*1000,
        secure:process.env.NODE_ENV==='production' ? true : false,
        sameSite:'None'
        });
        res.status(200).json({
            status:'success',
            code:200,
            data:{
                user:data,
                accessToken:accessToken
            },
            error:null
        });
    } catch (error) {
        return next(error,req,res,next);
    }
}

module.exports={handleLogin};

