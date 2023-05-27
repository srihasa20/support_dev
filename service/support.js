const mysql = require("../configuration/database")
const jwt = require("jsonwebtoken")


module.exports = class User{
async login(data)
{
    try{
        let results = await new Promise((status, error) =>{
        mysql.query(`select * from support where email = ?`, 
        [data.email], 
        (err, result) => {
            if (err){
                console.log(err)
                let temp = {
                    "status code": 500,
                    "message": "Internal server Error"
                }
                error(temp)
            }
            else{
                status(result)
            }
        })
    })

    console.log(results)

        if(!results.length){
               return{
                success: 1,
                data: "No user found for email"
            }
        }
    
       let user = results[0]
        if(user['password'] == data['password'])
        {
            let details = {
            id: user['id'],
            email: user['email']
            }

            let token = jwt.sign(details, 'qwe1234', {})
            
            return{
                success: 1,
                message: "logged in successfully",
                token: token
            }
        }
                

else
{
    return{
        success: 0,
        message:" email and password dosen't match"
    }
}
    }
catch(error)
{
    console.log(error)
}
}
}

