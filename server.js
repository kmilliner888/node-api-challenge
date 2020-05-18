const express = require('express');
const projectsRouter = require('./routers/projectsRouter');
const actionsRouter = require('./routers/actionsRouter');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Hey it works!</h2>`)
});

module.exports = server;