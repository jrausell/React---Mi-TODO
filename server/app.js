const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');

dotenv.config();
mongoose.set('strictQuery', false); //override the current strictQuery behavior and prepare for the new release Mongoose 7

const app = express();
const router = express.Router();

app.use(cors());
app.use(router);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
router.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI).then(() => {
});


const indexRouter = require('./routes/index');
const createTodoRoute = require('./routes/createTodoRoute');
const readTodosRoute = require('./routes/readTodosRoute');
const getTodoRoute = require('./routes/getTodoRoute');
const updateTodoRoute = require('./routes/updateTodoRoute');
const deleteTodoRoute = require('./routes/deleteTodoRoute');
const getSubTaskRoute = require('./routes/getSubTaskRoute');
const createSubTaskRoute = require('./routes/createSubTaskRoute');
const updateSubTaskRoute = require('./routes/updateSubTaskRoute');
const deleteSubTaskRoute = require('./routes/deleteSubTaskRoute');

const loginUserRoute = require('./routes/loginUserRoute');
const signUpUserRoute = require('./routes/signUpUserRoute');

//router.post('/login', require('./routes/loginRoute'));

router.post('/user/login', loginUserRoute);
router.post('/user/signup', signUpUserRoute);

//router.post('/todos', createTodoRoute);
router.get('/', indexRouter);
router.get('/todos', readTodosRoute);
router.post('/todos', createTodoRoute);

router.get('/todo/:id', getTodoRoute);
router.put('/todo/:id', updateTodoRoute);
router.delete('/todo/:id', deleteTodoRoute);

router.get('/todo/:parent/subtask/:id', getSubTaskRoute);
router.post('/todo/:parent/subtask', createSubTaskRoute);
router.post('/todo/:parent/subtask/:id', createSubTaskRoute);
router.patch('/todo/:parent/subtask/:id', updateSubTaskRoute);
router.delete('/todo/:parent/subtask/:id', deleteSubTaskRoute);


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
