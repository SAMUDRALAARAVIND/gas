//cshandler -->customersignup handler
const connection = require("./connection")
connection.connect()
class cshandler{
    constructor(data){
        this.username = data.username
        this.email = data.emailid
        this.password = data.create_password
        this.phonenumber = data.phn_number
        this.address = data.address
    }
    checkData(resolve){
        //checks if a user already exists or not
        var query = `SELECT * FROM customers WHERE email='${this.email}' or phonenumber ='${this.phonenumber}'`;
        connection.query(query,(err,result)=>{
            if(err) resolve(false,err)
            else {
                if(result.length>0){
                  resolve(false,result)
                }
                else
                  resolve(true,result)
            }
        })
    }
    //to get userid for the last registered
    getId(email,resolve){
        var query = `SELECT userid from customers WHERE email = '${email}';`
        connection(query,(err,result)=>{
            if(err) resolve(-1)
            else resolve(result[0].userid)
        })
    }

    pushData(resolve){
        //inserts if user previously not registered with us
        var query = `INSERT INTO customers(username,email,phonenumber,address,password) 
     VALUES('${this.username}','${this.email}','${this.phonenumber}','${this.address}','${this.password}');`
        connection.query(query,(err,result)=>{
            if(err) resolve(false,-1)
            else{
                this.getId(this.email,(data)=>{
                    if(data!=-1) resolve(false,data)
                    else resolve(true,data)
                })
            }
        })
    }
}

class clhandler{
    constructor(data){
        this.email = data.email
        this.password = data.password
    }
    checkUser(resolve){
        var query = `SELECT * FROM customers WHERE email='${this.email}' AND password ='${this.password}';`
        connection.query(query,(err,result)=>{
            if(err) resolve(false)
            else{
                if(result.length==1)
                    resolve(true)
                else
                  resolve(false)
            }
        })
    }
}



module.exports = {cshandler,clhandler}