const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/database')
var db=mongoose.connection
db.on('error',()=> console.log("error in connecting to database"))
db.once('open',()=> console.log("connected to database"))

app.post("./public/login.html",(req,res) =>{
    var name=req.body.name
    var email=req.body.email
    var number=req.body.number
    var password=req.body.password

    var data={
        "name":name,
        "email":email,
        "number":number,
        "password":password
    }
    db.collection('database').insertOne(data,(err,collection) =>{
        if(err){
            throw err;
        }
        console.log("record inserted successful")
    })
    return res.redirect('./public/login.html')
})

app.get("/",(req,res) =>{
    res.set({
        "allow-acces-allow-orgin":'*'
    })
    return res.redirect("./public/signup.html")
}).listen(3500);


    console.log("listening on port 3500")  

