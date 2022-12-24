const TodoModel = require('../models/TodoModel');
const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
  const {parent, id} = req.params;

  const todo = await TodoModel.findById(parent);
  if(todo && parent && id !== ""){
    const deletedTask = await TodoModel.updateOne(
      {
        _id: parent
      }, 
      {$pull: {subTasks: {_id: id}}}
    )
    res.json(deletedTask);
  }else{
    res.json({error: 'no todo'})
  }
}