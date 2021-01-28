const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/items');
const Item = mongoose.model('items');

router.post("/inventory", async (req, res) => {
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
          price:itemInfo.price,
          quantity:itemInfo.quantity
        });
        res.json (await newItem.save())
    })
    } catch (error) {
        res.send(error)
    }  
  });
  
  router.get("/inventory", (req, res, next) => {
    Item.find((err, response) => {
      res.json(response);
    });
  });

router.get('/inventory/:name', async function(req, res, next) {
 var name = req.params.name;
  try {
      console.log("id",name)
    res.json (await Item.findOne({name:name}))
  } catch (error) {
    res.send(error) 
  }
})  
  
router.patch('/inventory/:name', async function(req, res, next) {
    var name = req.params.name;
     try {
       res.send(await Item.findOneAndUpdate({name:name},req.body))     
     } catch (error) {
       res.send(error) 
     }
})

  router.delete("/inventory/:name", async (req, res) => {
      try {
        var name = req.params.name;
        res.send(await Item.deleteOne({name:name}))
      } catch (error) {
          res.send(error)
      } 
  });

  router.delete("/inventory", async (req, res) => {
      try {
        res.send(await Item.remove())
      } catch (error) {
          res.send(error)
      }
    
  });

  module.exports = router;