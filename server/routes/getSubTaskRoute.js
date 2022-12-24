const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const {parent, id} = req.params;
  const todo = await TodoModel.findOne(
    { _id: parent}
    , { 'subTasks': { $elemMatch:{_id: id} } });

  if(todo && todo.subTasks){
    res.json(todo.subTasks[0]);
  }else{
    res.json({error: 'no todo'})
  }
}