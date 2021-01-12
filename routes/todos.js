const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/todo');
const Todo = mongoose.model('todos');

router.post("/", (req, res) => {
    var todoInfo = req.body;
    if (!todoInfo.todo) {
      console.log("No Info found in post todo");
    } else {
      var c;
      Todo.findOne({}, (err, data) => {
        if (data) {
          c = data.unique_id + 1;
        } else {
          c = 1;
        }
  
        var newtodo = new Todo({
          unique_id: c,
          title: todoInfo.todo
        });
  
        newtodo.save((err, Person) => {
          if (err) {
          //   console.log(err);
          } else {
          //   console.log(Person);
          }
        });
      })
        .sort({ _id: -1 })
        .limit(1);
    }
    res.json({ Success: "1" });
  });
  
  router.get("/show", (req, res, next) => {
    Todo.find((err, response) => {
      res.json(response);
    });
  });
  
  router.delete("/todo/:id", (req, res) => {
    var id = req.params.id;
  
    Todo.findOneAndRemove({ unique_id: id }, function(err, offer) {
      console.log("deleted");
    });
    res.send("Success");
  });

  module.exports = router;