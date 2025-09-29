const express=require('express');
const app=express();
const cors=require('cors');
const errorHandler=require('./middlewares/errorHandler');
const verifyJWT=require('./middlewares/verifyJWT');
const cookieParser=require('cookie-parser')
const corsOptions=require('./config/corsOptions');
app.use(cors(corsOptions));
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use('/login',require('./routes/apis/login'))
app.use('/refreshToken',require('./routes/apis/refreshToken'))
app.use(verifyJWT);
app.use('/doctors',require('./routes/apis/doctors'));
app.use((req,res,next)=>{
    const error=new Error('404_Not_Found');
    error.code=404;
    next(error,req,res);
});
app.use(errorHandler);
app.listen(PORT)

