var express = require("express");
var route = express.Router();
var Readtext = require("text-from-image");
const t = require("tesseract.js");
const fileTrans = require("express-fileupload");
const app = express();

app.use(fileTrans())

/*
route.get("/",function(req,res,next){
    Readtext("./public/images/invoice.png").then(text=>{
      res.send(text)
    }).catch(err=>{
      res.send(err)
    })
});
*/
app.post("/", function(req, res, next){
  console.log(req)
  res.send("file.file.name")
})

module.exports = route