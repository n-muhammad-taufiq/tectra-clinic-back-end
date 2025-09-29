const allowedOrigins=require('./allowedOrigins');
const corsOptions={
    origin:(origin,callback)=>{
        if(!origin){
            return callback(null,true)
        }
        if(allowedOrigins.includes(origin)){
            callback(null,true);
        }
        else{
            callback(new Error('error:cors'));
        }
    },
    credentials:true
}
module.exports=corsOptions;