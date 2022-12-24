const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const {parent} = req.params;
  const {title} = req.body;

  const todo = await TodoModel.findById(parent);
  if(todo && title !== ""){
    const pushedI = todo.subTasks.push({ title });
    todo.save();
    const newSubTask = todo.subTasks[todo.subTasks.length - 1];
    res.json(newSubTask);
  }else{
    res.json({error: 'no todo'})
  }
}