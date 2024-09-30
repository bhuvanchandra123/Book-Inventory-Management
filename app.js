const express = require("express");
const mongoose = require("mongoose");
const books = require("./src/routes/books")


const app = express();


mongoose.connect("mongodb://localhost:27017/FirstDb")
        .then( ()=> console.log("connected to DB"))
        .catch( (err)=> console.log(err));


app.use(express.json());


app.use("/books", books)


app.listen(3000).on("listening", ()=>{
      console.log('listening on localhost:3000')
});
