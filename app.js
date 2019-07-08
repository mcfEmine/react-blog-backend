const express = require('express');
const bodyParser = require('body-parser'); // parser to handle the form data
const mongoose = require('mongoose');
const expValid = require('express-validator');
const morgan = require('morgan');
const cors = require ('cors'); // course model
const path = require('path');
//-------------------------------------------------------------------------------------------
  const Post = require('./models/post');
 const {createPostValid} = require('./validator/index');
 const db = require('./config/db').database;
//------------------------------------------------------------------------------------------

const app = express(); // initialize app
app.use(cors());  
app.use(bodyParser.json());
app.use(morgan("dev")); // Logger
app.use(expValid());

//-------------------------mongo db conn-----------------------------------------------------
mongoose.connect(db, {useNewUrlParser:true})
    .then(()=>{
        console.log("db conn success!")
    })
    .catch((err) => {
        console.log("db conn err!", err);
    });
//------------------------------define port-----------------------------------------------
const port=process.env.PORT || 8080;  
//---------------------------initialize public directory-------------------------------------
// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// })
//------------------------------------------------------------------------------------------
app.get('/', (req,res) => {
    res.send('<h1>emine</h1>')
});
//---------------------------------------------------------------------------------------------
const postRoutes = require('./routes/apis/post');
app.use('/api/posts', postRoutes);
//---------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log('server started on port', port)
});








