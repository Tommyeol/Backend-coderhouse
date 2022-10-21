const express = require('express');
const { PORT1 } = require('./config');
const { router } = require('./router/router');
const app = express();

app.use('/', router);

app.listen(PORT1, () => console.log(`Server listening on PORT: ${PORT1} - PDI: ${process.pid}`));