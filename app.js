const express= require('express');
const path=require('path');
const app=express();
const port =80;
const bodyparser=require("body-parser");
// getting-started.js

//Define Mongoose schema
//Now we wiil try to connect with our mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const ContactSchema = new mongoose.Schema({
    //Here now we have to include what all we are going to store

    name: String,
    phone: String,
    email: String,
    address:String,
    desc: String
    
  });
  const Contact = mongoose.model('Contact', ContactSchema);

//TO serve express
app.use('/static',express.static('static'))  //For serving static files
app.use(express.urlencoded())

//Pug Specific stuff
app.set('view engine','pug') //Set the template engine as pug
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const params ={};
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params ={};
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData  = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to DataBase")
    })
    
})
app.listen(port,()=>{
    console.log('Your application is listening on ',port);
})
