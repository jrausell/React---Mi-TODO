const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
  const todos = await TodoModel.find().sort({'completed':1 , 'updatedAt':-1 });
  res.send(todos);
};
