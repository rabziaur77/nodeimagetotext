var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imageRouter = require("./routes/imageconverter")
const t = require("tesseract.js");
const fileTrans = require("express-fileupload");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileTrans())
//app.use('/', indexRouter);
app.get("/",(req, res)=>{
  res.sendFile(__dirname + "/home.html")
})

app.post("/img", function(req, res, next){
  if(req.files){
    var file = req.files;
    file.file.mv(path.join(__dirname,"upload",file.file.name), msg=>{
      if(msg){
        res.send("There is error.")
      }
      else{
        t.recognize(path.join(__dirname,"upload",file.file.name),"eng")
        .then(read=>{
          res.send(read.data.text)
        })
        .catch(error=>{
          res.send("error")
        })
      }
    })
  }
})

app.use('/users', usersRouter);
app.use('/imagetotext', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 3000

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})

module.exports = app;
