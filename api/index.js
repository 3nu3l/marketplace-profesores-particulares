const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');
const classRouter = require('./routes/class');

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(classRouter);

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Backend OK' });
});

const PORT = process.env.HTTP_PORT || 3001;
var listener = app.listen(PORT, () => {
  console.log(listener.address().port + ' port is listening');
});

module.exports = app