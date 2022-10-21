const express = require('express');
const { PORT2 } = require('./config');
const { router } = require('./router/router');
const app = express();

app.use('/', router);

app.listen(PORT2, () => console.log(`Server listening on PORT: ${PORT2} - PDI: ${process.pid}`));