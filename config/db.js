const mysql = require('mysql')


    const con =()=>{
        return mysql.createConnection({
            host:'127.0.0.1',
            //port :'3306',
            user:'root',
            password:'root',
            database:'dbtreino'
        })
    }
module.exports=con;