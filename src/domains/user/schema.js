const Joi=require("joi");
const EditSchema=Joi.object({
    email:Joi.string().email().required(),
    username:Joi.string().min(3).max(20).required(),
    password:Joi.string().min(8).max(20).required(),
    securityQuestion:Joi.string().min(3).max(40).optional(),
    securityAnswer:Joi.string().min(3).max(40).optional(),
});
const SignUpSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(20).required(),
    username:Joi.string().min(3).max(20).required(),
    firstName:Joi.string().min(3).max(20).required(),
    lastName:Joi.string().min(3).max(20).required(),
    securityQuestion:Joi.string().min(3).max(40).optional(),
    securityAnswer:Joi.string().min(3).max(40).optional(),
});
const LoginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(8).max(20).required(),
}); 
const ForgetPasswordSchema=Joi.object({
    email:Joi.string().email().required(),
}); 
module.exports={
LoginSchema,
EditSchema,
LoginSchema,
ForgetPasswordSchema,
SignUpSchema,
};