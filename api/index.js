const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');

const User = require('./models/user');

const app = express();

app.use(express.json());
app.use(userRouter);

app.get('/test', (req, res) => {
  res.send('Hello world');
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' });
});

var listener = app.listen(process.env.HTTP_PORT || 3001, () => {
  console.log(listener.address().port + ' port is listening');
});

module.exports = app;