const express = require('express');
const mongoose = require('mongoose');
const { errors: celebrateErrors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const router = require('./routes/index');

const errors = require('./middlewares/errors');

const {
  PORT = 3000,
  MESTO_DB = 'mongodb://localhost:27017/',
} = process.env;

const app = express();

mongoose.connect(MESTO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors({
  origin: '*',
}));

// app.use(limiter);

app.use(helmet());
app.use(express.json());
app.use('/', router);

app.use(celebrateErrors());
app.use(errors);

app.listen(PORT);
