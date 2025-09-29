const pool=require('../config/database');
const refreshToken={
    storeRefreshToken:async (id,refreshToken)=>{
        try{
            await pool.query("INSERT INTO refresh_token(user_id,refresh_token) VALUES(?,?) ON DUPLICATE KEY UPDATE refresh_token=VALUES(refresh_token)",[id,refreshToken]);
        }
        catch(error){
            throw error;
        }
    }
}

module.exports=refreshToken;