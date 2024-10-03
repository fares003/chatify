const User =require('../model/userModel')
const bcrypt =require('bcrypt')

module.exports.register=async(req,res,next)=>{
    try {
        const {username,password,email}=req.body
        const isUsernameExist=await User.findOne({username})
        if(isUsernameExist)
            return res.json({msg:"this username is already exist",status:401})
        const isEmailExist=await User.findOne({email})
        if(isEmailExist)
            return res.json({msg:"this email is already exist",status:402})
        const hashedPassword=await bcrypt.hash(password,10)
        const user =await User.create({
            username,
            email,
            password:hashedPassword
        })
    delete user.password
    return res.json({status:200,user})
    } catch (error) {
       next(error)
    }
 
}
module.exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.json({status:404, msg: "User not found" });
      }
  
      const passwordIsCorrect = await bcrypt.compare(password, user.password);
      if (!passwordIsCorrect) {
        return res.json({status:404, msg: "The email or password is incorrect" });
      }
  
      delete user.password;
      return res.json({status:200, user });
    } catch (error) {
      next(error);
    }
  };