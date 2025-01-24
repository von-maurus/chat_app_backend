require('dotenv').config();

//DB CONFIG
const { connection } = require('./database/config').connection();

// Express Server
const express = require('express');
const app = express();

// Reading and parsing app
app.use(express.json());

const path = require('path');

// Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// My routes
app.use('/api/login', require('./routes/auth'))

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

server.listen(process.env.PORT, (error) => {
  if (error) {
    throw new Error('error server');
  }
  console.log('Server running on port: ', server.address().port);
});

