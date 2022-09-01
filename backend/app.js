require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = process.env.development ? 3001 : 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors({
  origin: [
    'https://mrvinil.project.nomoredomains.sbs',
    'http://mrvinil.project.nomoredomains.sbs',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app connected server with PORT:${PORT}`);
});
