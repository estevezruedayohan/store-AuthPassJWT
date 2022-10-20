const express = require('express');
const routerApi = require('./routes');
const {
  errorsLog,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.use(errorsLog);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
