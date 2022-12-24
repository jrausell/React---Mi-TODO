const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   email: { 
      type: String, 
      unique: true 
   },
   givenName: String,
   familyName: String,
   lastLogin: {
      at: Date,
      IP: String,
      city: String,
      browser: String,
      key: String
   }
}, {
   id: true,
   timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;