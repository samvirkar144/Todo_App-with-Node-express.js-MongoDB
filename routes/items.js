const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/items');
const Item = mongoose.model('items');

router.post("/items", async (req, res) => {
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
  
  router.get("/items", (req, res, next) => {
    Item.find((err, response) => {
      res.json(response);
    });
  });

router.get('/items/:id', async function(req, res, next) {
 var id = req.params.id;
  try {
      console.log("id",id)
    res.json (await Item.findById(id))
  } catch (error) {
    res.send(error) 
  }
})  
  
router.patch('/:id', async function(req, res, next) {
    var id = req.params.id;
     try {
       res.send(await Item.updatebyId(id))     
     } catch (error) {
       res.send(error) 
     }
})

  router.delete("/items/:id", (req, res) => {
    var id = req.params.id;
  
    Item.findOneAndRemove({ unique_id: id }, function(err, offer) {
      console.log("deleted");
    });
    res.send("Success");
  });

  module.exports = router;