const User = require("../models/userModel");
const {authSchema} = require("../helpers/validationSchema");
const mongoose = require('mongoose');
const createError = require('http-errors');


module.exports ={
// REGISTER USER
registerUser: async(req, res, next)=>{
    try{
    const result = await authSchema.validateAsync(req.body);

     const { email } = result;

      const Exists = await User.findOne({ email });

    if(Exists) throw createError.Conflict(`${email} has already been registered`);
        const user = new User(result)

    const savedUser = await user.save()
    res.send(savedUser);
} catch (error) {
    if(error.isJoi === true)error.status =422
    next(error)
}
},

//LOGIN USER
loginUser: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
     const user = await User.findOne({email:result.email})
      if (!user) throw createError.NotFound('User not registered')

      //matching the password
      const isMatch = await user.isValidPassword(result.password)
      if(!isMatch) throw createError.Unauthorized('Username/Password not valid');

      
      res.send('login successful bitch!!!')

}catch (error){
  if(error.isJoi ===true)
    return next(createError.BadRequest('invalid username/password'))

  next(error)
} 
},
};





