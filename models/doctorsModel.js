const pool=require('../config/database');
const Doctors={
    getDoctors:async (userId)=>{
        try {
            const [data]=await pool.query('SELECT * FROM doctors WHERE user_id=?',[userId]);
            return {data:data || null};

        } catch (error) {
            throw error;
        }
    },
    updateDoctor:async (data)=>{
        const {id,name,specialty,dateOfBirth,emailAddress,status,countryCode,contactNumber,userId,profilePhoto}=data;
        try{
            await pool.query("UPDATE doctors set name=?,specialty=?,date_of_birth=?,email_address=?,status=?,country_code=?,contact_number=?,user_id=?,profile_photo=? WHERE id=?",
            [name,specialty,dateOfBirth,emailAddress,status,countryCode,contactNumber,userId,profilePhoto,id]
            );
            return null;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    },
    addDoctor:async (data)=>{
        const {name,specialty,dateOfBirth,emailAddress,status,countryCode,contactNumber,userId,profilePhoto}=data;
        try{
            await pool.query("INSERT INTO doctors (name,specialty,date_of_birth,email_address,status,country_code,contact_number,user_id,profile_photo) VALUES(?,?,?,?,?,?,?,?,?)",[name,specialty,dateOfBirth,emailAddress,status,countryCode,contactNumber,userId,profilePhoto]);
            return null;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    },
    deleteDoctor:async (doctorId)=>{
        try{
            await pool.query('DELETE FROM doctors WHERE id=?',[doctorId])
            return null;
        }
        catch(error){
            throw error;
        }
    },
    deleteDoctors:async (data)=>{
        console.log('data : ',data);
        try{
            for(let i=0;i<data.length;i++){
            const doctorId=data[i];
            await pool.query('DELETE FROM doctors WHERE id=?',[doctorId])
            }
            return null;
        }
        catch(error){
            throw error;
        }
    }
}       

module.exports=Doctors;