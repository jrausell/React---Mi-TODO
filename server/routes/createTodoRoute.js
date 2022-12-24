const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const {title} = req.body;
  const todo = new TodoModel({
    title,
    description: '',
    completed: false
  })

  const newTodo = await todo.save();
  res.json(newTodo);
}