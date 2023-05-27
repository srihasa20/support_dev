const { createPool} = require("mysql")

const pool = createPool({
    
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.MYSQL_DB,
    connectionLimit: 1000
})

var getConnection = function(callback)
{
    pool.getConnection(function(err, pool)
    {
        callback(err, pool)
    })
}
module.exports = pool
