const express = require('express');
const cluster = require('cluster');
const cpus = require('os').cpus().length;
const { PORT } = require('./config');
const { router } = require('./router/router');
const app = express();

if (cluster.isPrimary) {
    console.log(`Master process ${process.pid} is running`);
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${new Date().toLocaleString()}\nWorker ${worker.process.pid} died. Restarting... ${signal || code}\nMaster process: ${process.pid}`);
        cluster.fork();
    });
} else {
    app.listen(PORT, () => {
        console.log(`Server listening on PORT: ${PORT} - Worker PDI: ${process.pid}`);
    })
}

app.use('/', router);