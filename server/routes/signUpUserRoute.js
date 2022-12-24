const UserModel = require('../models/UserModel');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  const { email, user_credential, loginMethod } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user && user_credential?.email) {
    const browser = req.headers['user-agent'] ?? null;
    const lastLogin = {
      at: Date.now(),
      loginMethod: loginMethod,
      browser: browser,
      IP: req.socket.remoteAddress,
      key: uuidv4()
    }

    const user = new UserModel({
      email,
      givenName: user_credential?.givenName,
      familyName: user_credential?.familyName,
      lastLogin: lastLogin
    })

    const newUser = await user.save();
  }

  res.json({ 'useragent': req.headers['user-agent'], email, user_credential, user });
}