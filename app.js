const express = require('express');
const app = express();
const testRoute=require('./api/routes/test')
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const categorypath = require('./api/routes/category')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');


mongoose.connect('mongodb://localhost:27017/CRM',{useNewUrlParser:true, useUnifiedTopology: true});


mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");

  con.query("ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'", function (err, result) {
    if (err) throw err;
    console.log("User authentication method updated to mysql_native_password");
    
    // Your application logic can go here
  });
});




app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles:true
}))

app.use(cors());

app.use('/test',testRoute);
app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/category',categorypath);

app.get('*',(req,res,next)=>{
  res.status(500).json({
    message:'bad request'
  })
})

module.exports = app;
