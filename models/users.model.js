const { Schema, model } =require("mongoose");
const userSchema = new Schema(
  {    
    email: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password:{
        type:String,
        required:true,
    },
    securityQuestion:{
        type:String,
        required:false,
    },
    securityAnswer:{
        type:String,
        required:false,
    }
}
);
module.exports = model("User", userSchema);
