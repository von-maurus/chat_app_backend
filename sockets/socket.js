const io = require('../index');


// Socket msgs
io.on('connection', client => {
  client.on('event', data => { console.log("Client event", data) });
  client.on('disconnect', () => { console.log("Client disconnected") });
  client.on("request", (payload) => {
    console.log("Request received...", payload)
    io.emit('reply', 'Server responding...');
  })
});