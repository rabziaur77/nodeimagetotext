var express = require("express");
var route = express.Router();
var Readtext = require("text-from-image");
const t = require("tesseract.js")

/*
route.get("/",function(req,res,next){
    Readtext("./public/images/invoice.png").then(text=>{
      res.send(text)
    }).catch(err=>{
      res.send(err)
    })
});
*/
route.get("/", function(req, res, next){
  t.recognize("./public/images/invoice.png", "eng")
  .then(out=>{
    res.send(out.data.text)
  }).catch(err=>{
    res.send(err)
  })
})

module.exports = route