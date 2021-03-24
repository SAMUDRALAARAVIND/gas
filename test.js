const connection = require("./packages/connection")

connection.connect()

connection.query("select * from customers;",(err,result)=>{
    if(err) console.log(err)
    else{
        console.log(result)
        console.log("Result lengtn is:      "+result.length)
    }
})