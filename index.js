const express = require('express');
const routerApi = require('./routes');
const {
  errorsLog,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');
const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://myapp.co'];

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};

app.use(cors(options));

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(errorsLog);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
