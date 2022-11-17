

const mongoose = require("mongoose")
const express = require("express"); 
const app= express();
const path = require("path")
const {UserModel}=require('./UserModel')
const url='mongodb://localhost/Software';


app.use(express.json()) 

app.use(express.urlencoded({ extended: true })) 
mongoose.connect(url, { useNewUrlParser: true })  
const con = mongoose.connection 

con.on('open', function () {
    console.log("connected...")
})



app.get("/",async(req,res)=>{
   

    res.sendFile(path.join(__dirname,"webSiteTaskHTML","indeX2.html"))
})

app.get("/account",(req,res)=>{
   

    res.sendFile(path.join(__dirname,"webSiteTaskHTML","account-login.html"))
})


app.post("/login",async(req,res)=>{
    try{
        
        const user =  await new UserModel(req.body)
         user.save()
         res.send("details added")
    }
    catch(e){
      console.log(e)
    }
  
})






app.use(express.static("webSiteTaskHTML"))

app.get("*",(req,res)=>{
    res.status(404).send("<h1>404</h1>")
})

const PORT = process.env.PORT || 1024;
app.listen(PORT,()=>{
    console.log("server is running 0n 1024")
})