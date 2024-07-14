const express = require('express');
const router = express.Router();
const { signUp, login, forgetPassword, editData, getAllUsers, deleteAllUsers } = require('./controller');
const { validate } = require('../../middlewares/validate.middleware');
const asyncHandler = require('../../middlewares/asyncHandler.middleware');
const { SignUpSchema, EditSchema, LoginSchema, ForgetPasswordSchema } = require('./schema');

router.post("/signUp", validate(SignUpSchema), asyncHandler(signUp));
router.patch("/editData", validate(EditSchema), asyncHandler(editData));
router.get("/login", validate(LoginSchema), asyncHandler(login));
router.get("/forgetPassword", validate(ForgetPasswordSchema), asyncHandler(forgetPassword));
router.get("/users", asyncHandler(getAllUsers));
router.patch("/users", asyncHandler(deleteAllUsers));

module.exports = router;
