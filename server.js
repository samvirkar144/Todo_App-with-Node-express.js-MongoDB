const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const todo = require("./model/todo.js");
const db = require('./config/database');
const todos = require('./routes/todos');
const items = require('./routes/items')
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
  res.render("index");
});


app.use('/', todos);
app.use('/',items)
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`listening on port ${port}`);
});
