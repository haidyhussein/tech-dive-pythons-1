var createError = require('http-errors');
const mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var examsRouter = require('./routes/exams')
var usersRouter = require('./routes/users')
var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();

//exams route
app.use('/api/exams', examsRouter);

//users route
app.use('/api/users', usersRouter)

app.get('/', (req, res) =>{
  res.json({mssg: 'Welcome to the app'})
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


//connect to db using mongoose
mongoose.set("strictQuery", false);
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 0,
  keepAlive: true,
  keepAliveInitialDelay: 30000, 
  retryWrites: true
};
mongoose.connect(process.env.MONG_URI, mongooseOptions)
  .then(() => {
    //listen for requests
  app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
  })
  })
  .catch((error) => {
    console.log(error)
  })

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

module.exports = app;
