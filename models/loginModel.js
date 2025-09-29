const pool=require('../config/database');
const Login={
    getUser:async (emailAddress)=>{
        try{
            const [data]=await pool.query('SELECT * FROM users WHERE email_address=?',[emailAddress]);
            return data ? data[0] : null;
        }
        catch(error){
            throw error;
        }
    }
}

module.exports=Login;       