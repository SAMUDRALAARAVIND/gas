//dshandler stands for deliveryboysignup handle
const connection = require("./connection")

class dshandler{
    constructor(data){
        this.username = data.username
        this.email = data.emailid
        this.password = data.create_password
        this.address = data.address
        this.phonenumber = data.phn_number
    }
    checkData(resolve){
        var query =`SELECT * FROM deliveryboys WHERE email='${this.email}' or phonenumber='${this.phonenumber}';`
        connection.query(query,(err,result)=>{
            if(err) 
                resolve(false)
            else{
                if(result.length>0)
                  resolve(false)
                else
                  resolve(true)
            }
        })
    }
    getData(resolve){
        var query = `SELECT userid,username FROM deliveryboys WHERE email="${this.email}"`
        connection.query(query,(err,result)=>{
            if(err) resolve(false,-1)
            else{
                if(result.length==0) resolve(false,-1)
                else{
                    resolve(true,{did:result[0].userid,username:result[0].username})
                }
            }
        })
    }
    pushData(resolve){
        var query = `INSERT INTO deliveryboys(username,email,phonenumber,address,password)  VALUES("${this.username}","${this.email}","${this.phonenumber}","${this.address}","${this.password}");`
        connection.query(query,(err,result)=>{
            if(err) resolve(false,-1)
            else{
                this.getData((status,latestData)=>{
                    if(!status) resolve(false,-1)
                    else{
                        resolve(true,latestData)
                    }
                })
            }
        })
    }
}


class dlhandler{
    constructor(data){
        this.email = data.email
        this.password = data.password
    }
    findUser(resolve){
        var query = `SELECT * FROM deliveryboys WHERE email="${this.email}" AND password="${this.password}";`
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



module.exports = {dshandler,dlhandler}