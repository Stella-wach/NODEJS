const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
});

//hashing the pwd before saving in the database
//this function will be called before saving the user
userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password = hashedPwd
        next()

    }catch (error) {
        next(error)
    }
});

//comparing the entered password and one saved in the DB
  userSchema.methods.isValidPassword = async function (password){
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      throw error
 }
  }

const User = mongoose.model('user', userSchema);
module.exports = User;