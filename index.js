import express from "express";
import mongoose from "mongoose"; 
import cors from "cors";
import ApplicantRouter from "./routers/applicant.router"
import dotenv from "dotenv";

var app = express();

const PORT = process.env.PORT || 8008;
dotenv.config()

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



async function main() {
  const uri = process.env.DATABASE;
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch(() => {
      console.log("could not connect to mongodb");
    });
}
main();



app.use("/applicant", ApplicantRouter)
