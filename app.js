const express = require("express");
// const router=require('./routes/routing');
const cookieParser = require("cookie-parser");
const sample = require("./model/schema");
const app = express();
const mongoose = require("mongoose");
const schema = require("./model/schema");
const dotenv = require('dotenv')
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");
require('dotenv').config()

app.use(express.static("public"));
app.set("view engine", "ejs");
const dbURI =
process.env.connection_string;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

let date=()=>{
    let ts = Date.now();

let date_ob = new Date(ts);


let date = ("0" + date_ob.getDate()).slice(-2);

let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);


let year = date_ob.getFullYear();


let hours = date_ob.getHours();

console.log(hours);
let minutes = date_ob.getMinutes();


let seconds = date_ob.getSeconds();


let timestamp=`${date}${month}${year}${hours}${minutes}${seconds}`;


return timestamp;
}



app.get("/generateReceipt", async(req, res) => {
  try {
    //get name from query string
    const name = req.query.name;

    //schema
    let newSchema = schema({
      updateOnUrlShortner: false,
      updateOnbillGenerator: false,
      receiptName: "",
    });

    //update updateOnbillGenerator
    newSchema.updateOnbillGenerator = true;

  

       //call sampleApi
const data=await  fetch("http://localhost:3000/sampleApi", {
    method: "GET",
    mode: "cors",
  });

  if(data){
    //after successfuly fetch, update updateOnUrlShortner
    newSchema.updateOnUrlShortner = true;
    console.log(date());
    var ans = `${name}${date()}`;
    console.log(Date.now());
    //update receiptName
        newSchema.receiptName = ans;
    const save= await newSchema.save();
    if(save){
        //if successfully save return json
       console.log(newSchema.receiptName);
       return res.json({ receiptName: ans });


    }
    else throw new Error("Somwthing Went Erong")
  }




    
  } catch (error) {
    console.log(error);
    res.statusCode=400;
    res.json(error.message);
  }
});
