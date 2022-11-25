const express = require('express');
require('dotenv').config();
require('./models/db');
const userRouter = require('./routes/user');
const classRouter = require('./routes/class');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json');
const swaggerConfig = require('./middlewares/config/swagger');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(classRouter);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const swaggerSpec = (swaggerJsDoc(swaggerConfig));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerSpec));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Backend OK' });
});

const PORT = process.env.HTTP_PORT || 3001;
var listener = app.listen(PORT, () => {
  console.log(listener.address().port + ' port is listening');
});

module.exports = app