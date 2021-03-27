//--------------------------------------modules and my packages starts here------------------------------------

const express = require("express");
const app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
const bodyParser = require('body-parser');
// const orders = require("routes/orders");
const orders = require("./routes/orders");
const connection = require("./connection");
connection.connect();
console.log("connected successfully");
const {validator} = require("./validator");
const {emailSender} = require("./validator.js");

app.use(express.static('public'));
var port = process.env.port  || 3000;
app.set("views","views");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

//########################################modules and packages headers ends here###############################


//------------------------------------login data handling segment ------------------------------------
app.get("/login",function(req,resp){
    resp.render("login");
});

app.post("/login",(req,resp)=>{
    var data = req.body;
    var query = `SELECT * FROM customers WHERE username='${data.username}' AND password='${data.password}';`;
    connection.query(query,(err,result)=>{
        if(result.length>=1){
            req.session.username = data.username;
            resp.send("/user");
        }
        else{
            resp.send("false")
        }
    })
});
//########################################login data handling ends here##########################################
app.get("/user/friends",(req,resp)=>{
    console.log(req.session.username)
    resp.send(`Hi ${req.session.username}`)
});




app.get("/user",function(req,resp){
    resp.render("welcome");
})
app.get("/success",(req,resp)=>{
    var email =  req.body;
})

//---------------------------------------------sigup data will be handled here--------------------------------
app.get("/signup",(req,resp)=>{
    resp.render("signup");
});

app.post("/signup",(req,resp)=>{
    var data = req.body;
    data.gender = data.gender[0];
    data.type = data.type[0];
    var formValidator = new validator(data.email,data.username,data.password);
    var errorArray = formValidator.validateForm();
    if(errorArray.length>0){
        resp.send(JSON.stringify(errorArray));
    }
    else{
        var tempUserQuery = `INSERT INTO tempuser(email,username,password,gender,type) VALUES('${data.email}','${data.username}','${data.password}','${data.gender}','${data.type}');`;
        connection.query(tempUserQuery);//inserting valid data into tempuser table
        var testing = new emailSender(data.email);//email sending for verification
        testing.createHtmlElement();
        var query = testing.insertPasscode();
        connection.query(query,(err,result)=>{
            if(err) console.log(err);
            resp.send(`/emailvalidation?email='${data.email}'`);
        });
    }
});
//############################################signup data handling ends here###################################



//---------------------------------------------email verification starts here----------------------------------
app.get("/emailvalidation",(req,resp)=>{
    var email = req.query.email;
    resp.render("emailvalidation",{email:email});
});
app.post("/emailvalidation",(req,resp)=>{
    var data = req.body;
    var query = `SELECT * FROM passcode WHERE email='${data.email}' AND code='${data.passcode}';`;
    var result = connection.query(query)
        if(result.length>0){
          connection.query(`SELECT * FROM tempuser WHERE email='${data.email}';`,(err,res)=>{
              connection.query(`INSERT INTO customers(email,username,password,gender,type) VALUES('${result[0].email}','${result[0].username}','${result[0].password}','${result[0].gender}'.'${result[0].type}');`);
              connection.query(`DELETE FROM tempuser WHERE email='${data.email}';`);
              connection.query(`DELETE FROM passcode WHERE email='${data.email}';`);
          });
          response.send("/home");
        }
        else
            resp.send("error");
});
//##############################################email verification ends here#####################################


app.get("/chat",(req,resp)=>{
    resp.render("chat")
})

app.get("/test" ,(req,resp)=>{
    resp.render("test")
})

