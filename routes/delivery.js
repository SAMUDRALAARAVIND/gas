const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(express.static('public'));
router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!"}));


router.get("/login",function(req,resp){
   resp.render("deliverylogin")
})

router.get("/signup",(req,resp)=>{
    resp.render("deliverysignup")
})

//did-->stands for deliveryguyid

router.get("/home",(req,resp)=>{
    if(!req.session.did)
        resp.render("deliverylogin")
    resp.render("deliveryhome")
})


router.get("/mywork",(req,resp)=>{ //This api needs to pass some data to ejs
    if(!req.session.did)
        resp.render("deliverylogin")
    resp.render("mywork")
})


router.get("/findorders",(req,resp)=>{ //this api needs to pass some data to ejs
    if(!req.session.did)
        resp.render("deliverylogin")
    resp.render("findorders")
})

module.exports = router