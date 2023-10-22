import express from "express";
import mongoose from "mongoose"; 
import cors from "cors";
import ApplicantRouter from "./routers/applicant.router"
const { MongoClient, ServerApiVersion } = require('mongodb');
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

// const username = encodeURIComponent('MyFormData');
// const password = encodeURIComponent('Form123@');  // Becomes Form123%40
// const uri = `mongodb+srv://${username}:${password}@aditya26.fbsaoy3.mongodb.net/?retryWrites=true&w=majority`;

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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
// mongoose
// .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => console.log('Connected to MongoDB Atlas!'))
// .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// mongoose
// .connect('mongodb://localhost:27017/FormDB')
// .then(() => console.log('Connected!'));

app.use("/applicant", ApplicantRouter)
