const express = require('express');
const multer = require('multer');
const cors = require('cors');
var routes = require('./routes');
require('dotenv').config();

const app = express()
app.use(cors());
app.use(express.static('public'))
const db = require('./config/database')()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).json({ err })
})

app.listen(process.env.PORT || 9000,()=>{
    console.log("Server started successfully")
})
