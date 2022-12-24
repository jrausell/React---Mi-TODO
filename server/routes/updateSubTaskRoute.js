const TodoModel = require('../models/TodoModel');
const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const {parent, id} = req.params;
  const {title, completed} = req.body;

  const todo = await TodoModel.findById(parent);
  if(todo && title !== ""){
    const updatedTask = await TodoModel.updateOne(
      {
        _id: parent,
        'subTasks._id': id
      }, 
      {$set: {'subTasks.$.title': title, 'subTasks.$.completed': completed}}
    )
    res.json(updatedTask);
  }else{
    res.json({error: 'no todo'})
  }
}