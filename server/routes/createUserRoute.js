const UserModel = require('../models/UserModel');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  const { email, givenName, familyName, lastLogin } = req.body;
  lastLogin = JSON.parse(lastLogin);
  lastLogin.IP = req.socket.remoteAddress;
  lastLogin.key = uuidv4();

  // Create token
  const browser = navigator.userAgent
  const token = jwt.sign(
    { email, browser },
    process.env.TOKEN_KEY,
    {
      expiresIn: "180d",
    }
  );

  const user = new UserModel({
    email,
    givenName,
    familyName,
    lastLogin
  })

  const newUser = await user.save();
  res.json(newUser);
}