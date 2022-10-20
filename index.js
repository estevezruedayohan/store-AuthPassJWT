const express = require('express');
const routerApi = require('./routes');
const {
  errorsLog,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');

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

routerApi(app);

app.use(errorsLog);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
