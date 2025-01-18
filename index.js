require('dotenv').config();
const express = require('express');

const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


server.listen(process.env.PORT, (error) => {
  if (error) {
    throw new Error('error server');
  }
  console.log('Server running on port: ', process.env.PORT);
});
app.use(express.static(publicPath));



// app.listen(process.env.PORT, (error) => {
//   if (error) {
//     throw new Error('error server');
//   }

//   console.log('Server running on port: ', process.env.PORT);
// });