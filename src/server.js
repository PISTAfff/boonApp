const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnect = require('./config/db'); 
const app = express();
const userRouter=require('../src/domains/user/router.js');
app.use(cors()); 
app.use(bodyParser.json()); 
dbConnect()
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
app.use("/user", userRouter); 
module.exports = app;
