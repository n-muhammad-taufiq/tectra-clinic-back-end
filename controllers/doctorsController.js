const Doctor=require('../models/doctorsModel');
const camelcaseKeys=require('camelcase-keys');

const getDoctors=async(req,res,next)=>{
    console.log(camelcaseKeys);
    const userId=req.params.userId;
    try{
        const {error,data}=await Doctor.getDoctors(userId);
        if(error){
            throw error;    
        }
        res.status(200);
        res.json({
        status:'success',
        code:200,
        data:{
            doctors:camelcaseKeys.default(data)
        },
        error:null
        })
    }
    catch(error){
        return next(error,req,res,next);
    }
}

const updateDoctor=async(req,res,next)=>{
    const data=req.body;
    try{
        await Doctor.updateDoctor(data);
        res.status(200);
        res.json({
        status:'success',
        code:200,
        data:null,
        error:null
        })
    }
    catch(error){
        return next(error,req,res,next);
    }
}

const addDoctor=async(req,res,next)=>{
    const data=req.body;
    try{
        await Doctor.addDoctor(data);
        res.status(201);
        res.json({
        status:'success',
        code:201,
        data:null,
        error:null
        })
    }
    catch(error){
        return next(error,req,res,next);
    }
}

const deleteDoctor=async(req,res,next)=>{
    const doctorId=req.params.doctorId;
    try{
        const {error}=await Doctor.deleteDoctor(doctorId);
        if(error){
            throw error;
        }
        res.status(200);
        res.json({
        status:'success',
        code:200,
        data:null,
        error:null
        })
    }
    catch(error){
        return next(error,req,res,next);
    }
}

const deleteDoctors=async(req,res,next)=>{
    const {data}=req.body;
    try{
        const {error}=await Doctor.deleteDoctors(data);
        if(error){
            throw error;
        }
        res.status(200);
        res.json({
        status:'success',
        code:200,
        data:null
        })
    }
    catch(error){
        return next(error,req,res,next);
    }
}

module.exports={getDoctors,updateDoctor,addDoctor,deleteDoctor,deleteDoctors}