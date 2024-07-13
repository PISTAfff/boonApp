const User = require("../../../models/users.model"); 
const emailExists=async(e)=>{
  const user = await User.findOne({ email: e });
  return user ? true : false;
};
const usernameExists=async(u)=>{
  const user = await User.findOne({ username: u });
  return user ? true : false;
};
const signUp = async (req, res, next) => {
    if(!await emailExists(req.body.email)&&!await usernameExists(req.body.username)){
      let user=await User.create({
        ...req.body
      });
      if(user){
        return res.json({
          success: true,
          messeage:"Account Created Successfully!",
        });
      }else{
        return res.json({
          success: false,
          messeage:"Account Creation Failed!",
        });
      }
    }else{
      return res.json({
        success: false,
        messeage:"Account Already Exists!",
      });
    }    
};
const getAllUsers=async (req, res, next) => {
  let users=await User.find({});
  return res.json({
    success: true,
    messeage:"Users",
    users:users
  });
};
const deleteAllUsers=async (req, res, next) => {
  await User.deleteMany({});
  return res.json({
    success: true,
    messeage:"Deleted Successfully",
  });
};
const editData = async (req, res, next) => {
  if(await emailExists(req.body.email)){
  let user=await User.findOne({email:req.body.email});
  Object.keys(req.body).forEach((key) => {
    if (key !== "email") {
      user[key] = req.body[key];
    }
  });
  await user.save();
  return res.json({
    success: true,
    messeage:"Account data Updated!",
  });
  }else{
    return res.json({
      success: false,
      messeage:"This account Doesnt Exist!",
    });
  }
};
const login=async(req,res,next)=>{
  let {password} = await User.findOne({ email: req.body.email }).select("password");
  if (password) {
    if (password === req.body.password) {
      return res.json({
        success: true,
        message: "Login Successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Login Failed! Incorrect password",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "Email Not Found!",
    });
  }  
};
const forgetPassword=async(req,res,next)=>{
  if(await emailExists(req.body.email)){
    let {securityQuestion,securityAnswer}=await User.findOne({email:req.body.email}).select("securityQuestion securityAnswer");
    if(securityQuestion){
      return res.json({
        success: true,
        messeage:"Security Question Found!",
        securityQuestion:securityQuestion,
        securityAnswer:securityAnswer
      }); 
    }else{
      return res.json({
        success: false,
        messeage:"no Security Question Found!"
      }); 
    }
  }else{
    return res.json({
      success: false,
      messeage:"Email Not Found!"
    }); 
  } 
};
module.exports = {
  signUp,
  editData,
  login,
  forgetPassword,
  getAllUsers,
  deleteAllUsers,
};