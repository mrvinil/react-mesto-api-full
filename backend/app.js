const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const authRoutes = require('./routes/auth');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  'https://mesto.frontend.sidorov.nomoredomains.monster',
  'https://api.mesto.sidorov.nomoredomains.monster',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.status(200).send();
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

// Логгер запросов нужно подключить до всех обработчиков роутов:
app.use(requestLogger); // подключаем логгер запросов

app.use('/', authRoutes);
app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardsRoutes);

app.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

// Логгер ошибок нужно подключить после обработчиков роутов и до обработчиков ошибок:
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening port ${PORT}`);
  }
});
