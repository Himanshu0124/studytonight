const express = require('express');
const path = require('path');
require('./src/db/db')
const Register = require('./src/models/register');
const hbs = require('hbs');
var app = express();
const { json } = require("express");
const port = process.env.PORT || 8000;
var nameLogin , emailLogin , cityLogin;

const static_path = path.join(__dirname , "/public");
const templates_path = path.join(__dirname , "/templates/views");
const partials_path = path.join(__dirname , "/templates/partials");
const images_path = path.join(__dirname , "/public/images");
const bodyparser = require('body-parser');
 

app.use(bodyparser.urlencoded({extended : false}));

app.use(express.json());
app.use(express.static(static_path));
app.use(express.static(images_path));
app.set('view engine' , 'hbs');
app.set('views' , templates_path);
hbs.registerPartials(partials_path);
 

app.get('/' , (req , res)=>{
    res.render('index');
 });

 app.get('/about' , (req , res)=>{
   res.render('about');
});

app.get('/career' , (req , res)=>{
   res.render('career');
});

app.get('/contact' , (req , res)=>{
   res.render('contact');
});

app.get('/chem' , (req , res)=>{
   res.render('chem');
});

app.get('/math' , (req , res)=>{
   res.render('math');
});

app.get('/buy' , (req , res)=>{
   res.render('buy' , {title:nameLogin , myEmail:emailLogin , myCity:cityLogin});
});

 app.get('/physics' , (req , res)=>{
   res.render('physics' , {title:nameLogin , myEmail:emailLogin});
});
 app.get('/login' , (req , res)=>{
   res.render('login');
});
 app.get('/register' , (req , res) => {
    res.render("register");
})

app.post('/register' , async(req , res) => {
    try {
        const registerStu = new Register({
           name:req.body.name , 
           email:req.body.email,
           father:req.body.fname,
           college:req.body.clgname,
           city:req.body.city,
           contact:req.body.cnum ,
           password:req.body.pswd , 
        })
        const registered = await registerStu.save();
        return res.status(201).render("index" , {title:'Success!' , success:'Data Inserted SuccessFully' , check:'true'});
        console.log(title);
      } catch (error) {
        res.status(404).send(error);
     }
     
});
app.post('/login' , async(req , res) => {
   try{
   const email = req.body.email;
   const pswd = req.body.pswd;

   const userEmail = await Register.findOne({email:email});
   if(userEmail.password == pswd)
   {
      res.status(201).render("profile" ,  {
         clg : {
            myName : userEmail.name
         }
         });
   }
   nameLogin = userEmail.name;
   emailLogin = userEmail.email;
   cityLogin = userEmail.city;
}
catch (error) {
   res.status(404).send("Invalid Login Details"); 
 }

})

app.listen(port , ()=>{
    console.log(`Server is running on ${port}`);
 })





