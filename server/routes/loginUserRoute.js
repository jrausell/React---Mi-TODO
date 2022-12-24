const UserModel = require('../models/UserModel');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  const { email, user_credential, loginMethod } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    res.json({error: 'User or Password incorrect.'})
    return
  }

  res.json({ 'useragent': req.headers['user-agent'], email, user_credential, user });
}