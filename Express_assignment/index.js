'use strict';
const express = require('express')
const fs = require('fs');
const app = express()
const bodyParser = require('body-parser');
const db = require('../config/database')
const items = require('../routes/items');
const mongoose = require("mongoose");
const path = require("path");
require('../model/items')
const Item = mongoose.model('items');
const pug = require('pug');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect(db.mongoURI,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(() => {
  console.log('MongoDB connected for express js assignmet...');
}).catch(err => {
  console.log(err);
});

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const publicDir = require('path').join(__dirname,'/public'); 
app.use(express.static(publicDir));
// app.use(express.static(path.join(__dirname, "/public")));
let port = process.env.PORT ||8080
// 1 hello world print -- http://localhost:3000/
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//===========================2===========
//2 print born year
app.get('/year', (req, res) => {
    const req_params = req.query;
    const year = new Date().getFullYear();
    res.send(`you were born in ${year-req_params.age}`)
  })
//===============3  ========================
app.get('/home', (req, res) => {
    res.send('Hello World!')
  })
//============ 4 ==== and PORT=1337 node index.js -- run on port 1337
  app.get('/time', (req, res) => {
    res.send(new Date().toISOString())
  })
//port = process.argv[2]
//==============5 =========Form submision with post method--
app.get('/form', (req, res) => {
  console.log(`${__dirname}/form.html`)
  res.sendFile(__dirname + '/form.html');
});
app.get('/form/view', async(req, res) => {
  res.send(await Item.find())
  //res.sendFile(__dirname + '/form.html');
});
app.post("/items", async (req, res) => {
  var itemInfo = req.body;
  console.log("itemInfo",itemInfo)
  try {
      var newItem = new Item(itemInfo);
      var c;
    Item.findOne({}, async(err, data)=> {
      if (data) {
        c = data.unique_id + 1;
      } else {
        c = 1;
      }
      var newItem = new Item({
        unique_id: c,
        name: itemInfo.name,
        price:itemInfo.price
      });
      res.json (await newItem.save())
  })
  } catch (error) {
      res.send(error)
  }  
});


//=============== 6 ======== static file html,css and images -- display html file with image and text
app.get('/image', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
//==========   7 ==================== done with todo assignment...
//========== 8   pug template engine===================
app.get('/date/home', async(req, res) => {
  //res.render('campgrounds/edit', { campground });
  const date = new Date().toDateString()
  //res.render(__dirname+'/home',{date});
  res.render('home',{date})
});

//========== 9 =======================
port = process.argv[2] || 8080;
global.file_name = process.argv[3] || 'data.txt'
console.log("file_name",file_name)
app.get('/books', (req, res) => {
    console.log("======",file_name)
    fs.readFile(`${file_name}`, 'utf8', function(err, data) {
        if (err) throw err;
        console.log("ead file write console the content-->",data);
        res.json(data)
    });
  })

  

  app.use('/',items)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


