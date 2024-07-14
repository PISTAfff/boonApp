const express = require('express');
const router = express.Router();
const { signUp, login, forgetPassword, editData, getAllUsers, deleteAllUsers, deleteUser, getUser, confirmAnswer, changePassword } = require('./controller');
const { validate } = require('../../middlewares/validate.middleware');
const asyncHandler = require('../../middlewares/asyncHandler.middleware');
const { SignUpSchema, EditSchema, LoginSchema, ForgetPasswordSchema, onlyEmailSchema, ConfrimAnswerSchema } = require('./schema');

router.post("/signUp", validate(SignUpSchema), asyncHandler(signUp));
router.patch("/editData", validate(EditSchema), asyncHandler(editData));
router.get("/login", validate(LoginSchema), asyncHandler(login));
router.get("/forgetPassword/confirmAnswer", validate(ConfrimAnswerSchema), asyncHandler(confirmAnswer));
router.get("/forgetPassword", validate(ForgetPasswordSchema), asyncHandler(forgetPassword));
router.patch("/createNewPassword", validate(LoginSchema), asyncHandler(changePassword));
router.get("/:email",validate(onlyEmailSchema), asyncHandler(getUser));
router.get("/", asyncHandler(getAllUsers));
router.delete("/delete/:email",validate(onlyEmailSchema), asyncHandler(deleteUser));
router.delete("/delete", asyncHandler(deleteAllUsers));

module.exports = router;
