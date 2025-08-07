const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: String,
    checked: Boolean
});
const ToDoList = mongoose.model('ToDoList', listSchema);    

module.exports = ToDoList;
