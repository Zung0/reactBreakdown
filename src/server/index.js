//https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs

var path = require('path');
var express = require('express');
const ToDoList = require('./entities/list');
const mongoose = require('mongoose');
mongoose.connect('mongodb://soc-cm4025-17:27017/rgu_courses')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));



var app = express();

var options = {
    index: "myWebPage.html"
  };

var dir = path.join(__dirname, '../frontend');
// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // or specify your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/api', function(req, res){
    res.send("Yes we have an API now")
});

// e.g. test using:
//http://127.0.0.1:8000/api/postList?name=John&checked=true
app.post('/api/postList', async function(req, res){
  const { name, checked } = req.query;
  const todoList = new ToDoList({ name, checked });
  try {
    await todoList.save();
    res.send('Successful request for /api/postList');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating document');
  }
});

app.get('/api/getList', async function(req, res){
  try {
    const todoList = await ToDoList.find();
    res.send(todoList);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting document');
  }
});

app.post('/api/modifyList', async function(req, res){
 const { id, name, checked } = req.query;
  try {
    const todoList = await ToDoList.findOneAndUpdate({ _id: id }, { name, checked }, { new: true });
    res.send('Successful request for /api/modifyList');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating document');
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