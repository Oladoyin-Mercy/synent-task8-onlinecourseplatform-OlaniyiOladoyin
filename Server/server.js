const express = require ('express')
const cors = require ('cors')
const dotenv = require ('dotenv')
const mongoose = require ('mongoose')
require('dotenv').config();

const app = express()

app.use(cors());
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended: true}))