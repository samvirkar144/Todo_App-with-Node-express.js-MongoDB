const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const db = require('../config/database');
const itemRoute = require('./itemRouter')
const mongoose = require("mongoose");
// connect to mongoose
mongoose.connect(db.mongoURI,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(() => {
    console.log('MongoDB connected...');
}).catch(err => {
    console.log(err);
});
//
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  console.log(req.url)
  res.send("Welcome to web services application!");
});

app.use('/api/item',itemRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
   console.log(`listening on port ${port}`);
});
