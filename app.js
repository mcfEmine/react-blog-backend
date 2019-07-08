const express = require('express');
const bodyParser = require('body-parser'); // parser to handle the form data
const mongoose = require('mongoose');
const expValid = require('express-validator');
const morgan = require('morgan');
const cors = require ('cors'); // course model
const passport = require('passport');
const path = require('path');
//--------------------------------------------------
const app = express(); // initialize the app
//-------------------------------------------------------------------------------------------
  const Post = require('./models/post');
 const {createPostValid} = require('./validator/index');
 const db = require('./config/db').database;
//---------------------Defining the middlewares--------------------------------------------------------------------
app.use(cors());  
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev")); 
app.use(expValid());

//-------------------------mongo db conn-----------------------------------------------------
mongoose.set('useCreateIndex',true);
mongoose.connect(db, {useNewUrlParser:true})
    .then(()=>{
        console.log("db conn success!")
    })
    .catch((err) => {
        console.log("db conn err!", err); 
    });
//------------------------------defining the port-----------------------------------------------
const port=process.env.PORT || 8080;  
//---------------------------initialize public directory-------------------------------------
// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// })
//----------------------------------static folder--------------------------------------
app.use(express.static(path.join(__dirname,'public')));
//----------------------------------
app.get('/', (req,res) => {
    return res.json({
        message:"emine node js hoşgeldin"
    })
});
//---------------------------------------------------------------------------------------------
const postRoutes = require('./routes/apis/post');
app.use('/api/posts', postRoutes);
//---------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log('server started on port', port)
});








