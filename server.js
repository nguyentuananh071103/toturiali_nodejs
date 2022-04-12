const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');


const app = express();

dotenv.config({path:'config.env'})
const port = process.env.port || 8080

// log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parser request to body-parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

// set view engine
app.set("view engine","ejs")
// app.set("views", path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

app.listen(port, ()=>{console.log(`Địa chỉ của tôi là http://localhost:${port}`)});