const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
app.use(cookieParser());


const customers = require("./routes/customers");


const delivery = require("./routes/delivery")


app.use("/delivery",delivery)
app.use("/customers",customers);
//app.use(session({secret: "Shh, its a secret!"}));

app.use(express.static('public'));
const port = process.env.port ;
app.set("views","views");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));



app.listen(port, () => {
    console.log(`Server started on ${port}`);
})

app.get("/",(req,resp)=>{
    resp.render("welcome")
})

