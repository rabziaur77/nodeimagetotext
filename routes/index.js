var express = require('express');
var router = express.Router();
var path = require('path');
const app = express()

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('home.html', { title: 'Express' });
});
*/

app.get("/",(req, res)=>{
  res.sendFile(__dirname + "/views/home.html")
})

module.exports = router;
