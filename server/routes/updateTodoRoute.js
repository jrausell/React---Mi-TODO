const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const {id} = req.params;
  const todo = await TodoModel.findById(id);

  todo.title = req.body.title;
  if(req.body.description) todo.description = req.body.description;
  else todo.description = '';

  if(req.body.completed && req.body.completed === true && todo.completed === false){
    todo.completed = true;
    todo.completedAt = Date.now();
  }else if(req.body.completed === false){
    todo.completed = false;
    todo.completedAt = null;
  }

  await todo.save();
  res.json(todo);
}