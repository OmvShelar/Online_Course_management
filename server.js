
const express = require ('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user_routes');
const courseRoutes = require('./routes/course_routes');

const {connectDB}= require('./config/db');

const app = express();


app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use('/user', userRoutes);
app.use('/course', courseRoutes);


app.listen(8001,()=>{
    console.log("Server Started");
})

