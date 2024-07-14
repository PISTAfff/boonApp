const User = require("../../../models/users.model");
const emailExists = async (e) => {
  const user = await User.findOne({ email: e });
  return user ? true : false;
};
const usernameExists = async (u) => {
  const user = await User.findOne({ username: u });
  return user ? true : false;
};
const signUp = async (req, res, next) => {
  if (
    !(await emailExists(req.body.email)) &&
    !(await usernameExists(req.body.username))
  ) {
    let user = await User.create({
      ...req.body,
    });
    if (user) {
      return res.json({
        success: true,
        messeage: "Account Created Successfully!",
      });
    } else {
      return res.json({
        success: false,
        messeage: "Account Creation Failed!",
      });
    }
  } else {
    return res.json({
      success: false,
      messeage: "Account Already Exists!",
    });
  }
};
const getAllUsers = async (req, res, next) => {
  let users = await User.find({});
  return res.json({
    success: true,
    messeage: "Users",
    users: users,
  });
};
const deleteAllUsers = async (req, res, next) => {
  await User.deleteMany({});
  return res.json({
    success: true,
    messeage: "Deleted Successfully",
  });
};

const getUser = async (req, res, next) => {
  if (await emailExists(req.params.email)) {
    let user = await User.findOne({ email: req.params.email });
    return res.json({
      success: true,
      messeage: "User",
      users: user,
    });
  } else {
    return res.json({
      success: false,
      messeage: "No Email Found!",
    });
  }
};
const deleteUser = async (req, res, next) => {
  if (await emailExists(req.params.email)) {
    await User.deleteOne({ email: req.params.email });
    return res.json({
      success: true,
      messeage: "Deleted Successfully",
    });
  } else {
    return res.json({
      success: false,
      messeage: "No Email Found!",
    });
  }
};
const editData = async (req, res, next) => {
  if (await emailExists(req.body.email)) {
    let user = await User.findOne({ email: req.body.email });
    Object.keys(req.body).forEach((key) => {
      if (key !== "email") {
        user[key] = req.body[key];
      }
    });
    await user.save();
    return res.json({
      success: true,
      messeage: "Account data Updated!",
    });
  } else {
    return res.json({
      success: false,
      messeage: "This account Doesnt Exist!",
    });
  }
};
const login = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user.password) {
    if (user.password === req.body.password) {
      return res.json({
        success: true,
        message: "Login Successfully",
        user: user,
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
const forgetPassword = async (req, res, next) => {
  if (await emailExists(req.body.email)) {
    let { securityQuestion } = await User.findOne({
      email: req.body.email,
    }).select("securityQuestion");
    if (securityQuestion) {
      return res.json({
        success: true,
        messeage: "Security Question Found!",
        securityQuestion: securityQuestion,
      });
    } else {
      return res.json({
        success: false,
        messeage: "no Security Question Found!",
      });
    }
  } else {
    return res.json({
      success: false,
      messeage: "Email Not Found!",
    });
  }
};
const confirmAnswer = async (req, res, next) => {
  if (await emailExists(req.body.email)) {
    let { securityAnswer } = await User.findOne({
      email: req.body.email,
    }).select("securityAnswer");
    if (securityAnswer == req.body.securityAnswer) {
      return res.json({
        success: true,
        messeage: "Answer Is Correct",
      });
    }else{
      return res.json({
        success: false,
        messeage: "Answer Is Wrong",
      });
    }
  } else {
    return res.json({
      success: false,
      messeage: "Email Not Found!",
    });
  }
};

const changePassword = async (req, res, next) => {
  if (await emailExists(req.body.email)) {
    let user = await User.findOne({ email: req.body.email });
    user.password = req.body.password;
    await user.save();
    return res.json({
      success: true,
      messeage: "Password Changed!",
    });
  } else {
    return res.json({
      success: false,
      messeage: "This account Doesnt Exist!",
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
  deleteUser,
  getUser,
  changePassword,
  confirmAnswer,
};
