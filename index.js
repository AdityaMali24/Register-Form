import express from "express";
import mongoose from "mongoose"; 
import cors from "cors";
import ApplicantRouter from "./routers/applicant.router"

var app = express();

const PORT = process.env.PORT || 8008;

app.use(express.json())
app.use(express.static(__dirname))

app.listen(PORT, ()=>{
    console.log("Your server running on http://localhost:"+ PORT)
})

var corsOptions = {
    origin: ["*" ,"http://localhost:3000"],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

mongoose
.connect('mongodb://localhost:27017/FormDB')
.then(() => console.log('Connected!'));

app.use("/applicant", ApplicantRouter)
