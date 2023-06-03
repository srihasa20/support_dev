/*const mysql = require("../configuration/database")
const jwt = require("jsonwebtoken")


module.exports = class User{
async login(data)
{
    try{
        let results = await new Promise((status, error) =>{
        mysql.query(`select * from support where id = ?`, 
        [data.id], 
        [data.name], 
        [data.email], 
        [data.password], 
        [data.mobile], 
        [data.creator_id], 
        [data.creator_role], 
        [data.created_at], 
        [data.updated_at], 


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
                data: "No user found for id"
            }
        }
    
       let user = results[0]
        if(user['id'] == data['id'])
        {
            let details = {
            id: user['id'],
            name: user['name'],
            email: user['email'],
            password: user['password'], 
            mobile: user['mobile'], 
            creator_id: user['creator_id'], 
            creator_role: user['creator_role'], 
            created_at: user['created_at'], 
            updated_at: user['updated_at']
    
            }

            let token = jwt.sign(details, 'qwe1234', {})
            
            return{
                success: 1,
                message: "id present in the table",
                token: token
            }
        }
                

else
{
    return{
        success: 0,
        message:" id not present "
    }
}
    }
catch(error)
{
    console.log(error)
}
}
}*/

const mysql = require("../utils/mysql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Crypt = require("../utils/crypt");

const uniqid = require("uniqid");

module.exports = class User {
  async login(data) {
    try {
      let results = await new Promise((resolve, reject) => {
        mysql.query(
          `select * from support where email = ?`,
          [data.email],
          (err, result) => {
            if (err) {
              console.log(err);
              let temp = {
                "status code": 500,
                message: "Internal server Error",
              };
              reject(temp);
            } else {
              resolve(result);
            }
          }
        );
      });
      console.log(results)
      if (!results.length) {
        return {
          success: 1,
          data: "No user found for email",
        };
      }

      let user = results[0];
      if (user["password"] == data["password"]) {
        let details = {
          user_id: user["id"],
          email: user["email"],
          user_role: "support",
        };

        let token = jwt.sign(details, process.env.JWT_KEY, {
          expiresIn: "24h",
        });
        
        return {
          success: 1,
          message: "logged in successfully",
          token: token,
        };
      } else {
        return {
          success: 0,
          message: " email and password dosen't match",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createAccount(data) {
    try {
      let values = {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        creator_id: data.creator_id,
        creator_role: data.creator_role,
      };

      values["id"] = uniqid.time();

      let crypt = new Crypt();
      values["password"] = await crypt.encrypt(data["password"]);

      let insert = await new Promise((resolve, reject) => {
        mysql.query(`insert into support set ?`, [values], (err, result) => {
          if (err) {
            console.log(err);
            let temp = {
              "status code": 500,
              message: "Internal server Error",
            };
            reject(temp);
          } else {
            resolve(result);
          }
        });
      });

      return {
        success: 1,
        message: "Account created successfully",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async UserSearch(data)
  {
      let values = {
        name: data.name,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        mobile: data.mobile,
        regd_no: data.regd_no
      }

}
}