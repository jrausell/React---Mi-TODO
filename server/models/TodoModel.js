const mongoose = require('mongoose');

const SubTaskSchema = new mongoose.Schema({
   orden: { type: Number, default: 0 }, 
   title: String,
   completed: { type: Boolean, default: false }
}, { 
   id: true,
   timestamps: true 
});

const TodoSchema = new mongoose.Schema({
   orden: { type: Number, default: 0 },
   title: String,
   description: String,
   completed: { type: Boolean, default: false },
   completedAt: Date,
   subTasks:[SubTaskSchema]
}, { 
   id: true,
   timestamps: true 
});

const TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = TodoModel;