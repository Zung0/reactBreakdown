//https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs

var path = require('path');
var express = require('express');
const { isNonNullExpression } = require('typescript');

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://soc-cm4025-17:27017/rgu_courses')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));


var app = express();

var options = {
    index: "myWebPage.html"
  };

var dir = path.join(__dirname, '../frontend');



app.get('/api', function(req, res){
    res.send("Yes we have an API now")
});

// e.g. test using:
//http://127.0.0.1:8000/api/getPrice?salary=2000&days=20
app.get('/api/postList', async function(req, res){
    console.log("received request for /api/postList");
    if (n && c ) {
        var n = req.query.name;
        let c = req.query.checked;
        console.log(n);
        console.log(c);
        const todolist = new ToDoList({name: n, checked: c});
        console.log(todolist);
        // await todolist.save();
        res.send("successful request for /api/postList"); 
        
    }else{
        console.log("bad request for /api/postList");   
    }
    
 });
app.use(express.static(dir, options));

// 404 page

app.use(function ( req, res, next) {
    res.send('This page does not exist!')
});

app.listen(8000, function () {
    console.log('Listening on http://localhost:8000/');
});