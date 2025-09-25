import { render } from "ejs";
import express from "express";
import { join } from "path";
import dotenv from "dotenv";
import router from './router/router.js'
import db from './config/database.js'

const app =  express()

dotenv.config()
const PORT = process.env.PORT


app.set('view engine' , 'ejs')
app.set('views' , './src/view')
app.use(express.static("public"));
app.use(router)
app.listen(PORT, () =>{
   console.log("server runed")
 })