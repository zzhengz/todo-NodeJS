var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.set("view engine","jade");


var pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'1q3e5t7u',
    database:'test'
});

app.post("/",function(req,res){
    
    pool.query('insert into todos(todo_content) values("' +req.body.txt+'");',function(err,row,field){
        if(err)throw err;
        res.redirect('/');
    });
});

app.get("/",function(req,res){
    console.log("home visited");
    pool.query("select * from todos;",function(err,row,field){
        if(err)throw err;
        res.render("list",{data:row});
    
    });
});

app.listen(3000);