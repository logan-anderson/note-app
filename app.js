const Ddos = require('ddos');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const ddos = new Ddos({ burst: 10, limit: 15 });

// Are we in develop mode or prod mode?
let devMode = false;
if (typeof process.argv[2] === 'string' && process.argv[2] === 'dev') {
  console.log('application is in dev mode');
  devMode = true;
}

// set up database
const {
  userName, password, dev, prod, local, clusterName, useUri, uri, devUser, devPass,
} = require('./credentials/credentials');

const table = devMode ? dev : prod;
const trueUri = useUri ? uri : `mongodb+srv://${userName}:${password}@${clusterName}.mongodb.net/${table}?retryWrites=true&w=majority`;

if (local) {
  console.log('Using localhost mongodb');
  mongoose.connect(`mongodb://localhost/${table}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongodb connected...'))
    .catch((err) => console.log(`error: ${err}`));
} else {
  console.log('Using remote mongodb');
  mongoose.connect(trueUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongodb connected...'))
    .catch((err) => console.log(`error: ${err}`));
}


const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const noteRouter = require('./routes/note');
const accountRouter = require('./routes/account');
const homeRouter = require('./routes/homePage');

const app = express();

// set up ddos

app.use(ddos.express);
// passport config
require('./config/passport')(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// express session middlewear
app.use(session({
  secret: 'shh',
  resave: true,
  saveUninitialized: true,
}));

// passport middlewear
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.devUser = devMode ? devUser || '' : '';
  res.locals.devPass = devMode ? devPass || '' : '';

  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/note', noteRouter);
app.use('/account', accountRouter);
app.use('/home', homeRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send(err);
// });

module.exports = app;
