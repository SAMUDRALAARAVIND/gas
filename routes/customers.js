const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const {cshandler,clhandler} = require("./../packages/cshandler")
router.use(bodyParser.urlencoded({extended:true}));

router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!"}));

router.use(express.static('public'));

router.get("/login",(req,resp)=>{
   resp.render("customerlogin");
})






router.get("/signup",(req,resp)=>{
    resp.render("customersignup")
})
router.post("/signup",(req,resp)=>{
    var data =  req.body
    var test = new cshandler(data); 
    test.checkData((status,d)=>{
        if(!status){
             resp.send("<script>alert('user already exist')</script>")
             console.log(d)
        }
        else{
            test.pushData((status,cid)=>{
                if(status){
                    req.session.cid = cid
                    resp.render("customerhome")
                }
                else{
                    resp.send("<script>alert(`There's an error`)</script>")
                }
            })
        }
    })
})








//cid -->customerId
router.get("/home",(req,resp)=>{
    if(!req.session.cid)
        resp.render("customerlogin")
    resp.render("customerhome")
})

router.get("/myorders",(re,resp)=>{
    if(!req.session.cid)
        resp.render("customerlogin")
    resp.render("myorders")
})

router.get("myorders/:id",(req,resp)=>{
    if(!req.session.cid)
        resp.render("customerlogin")

})

module.exports = router