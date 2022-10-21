const express = require('express');
const { PORT } = require('./config');
const { router } = require('./router/router');
const app = express();

app.use('/', router);

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT} - PDI: ${process.pid}`));