const { io } = require('../index');

// Socket msgs
io.on('connection', client => {
  client.on('disconnect', () => { console.log("Client disconnected") });
  client.on("request", (payload) => {
    console.log("Request received...", payload)
  })
});