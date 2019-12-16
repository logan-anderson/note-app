const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
// var logger = require('morgan');

//set up database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/notes_db", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('mongodb connected...'))
    .catch(()=>console.log('error'));



const noteSchema = new mongoose.Schema({
    note_id: Number,
    note_content: String,
    list_content: Array,
    title: String,
})
const noteSchema_backup = new mongoose.Schema({
    note_id: Number,
    note_content: String,
    list_content: Array,
    title: String,
})
mongoose.model("Note", noteSchema);
mongoose.model("NoteBackup", noteSchema_backup);





const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const noteRouter = require('./routes/note');
const accountRouter = require('./routes/account');
const homeRouter = require('./routes/homePage');

const app = express();

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

app.use( (req,res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    
    next();
});


// app.use(logger('dev'));
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
