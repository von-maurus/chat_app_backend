const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
console.log("init server")
bands.addBand(new Band('', 'Queen', 0));
bands.addBand(new Band('', "Metallica", 0));
bands.addBand(new Band('', "Megadeth", 0));

// Socket msgs
io.on('connection', client => {
  client.emit('active-bands', bands.getBands());
  client.on('event', data => { console.log("Client event", data) });
  client.on('disconnect', () => { console.log("Client disconnected") });
  client.on("request", (payload) => {
    console.log("Request received...", payload)
    // io.emit('reply', payload); // Send to all connected clients
    // client.emit('reply', payload); // Send to the client that sent the request
    // client.broadcast.emit('reply', payload); // Send to all connected clients except the one that sent the request
  })
  client.on("emit-client", (payload) => {
    console.log("Message received...", payload)
    client.broadcast.emit('reply-to-browser', payload); // Send to all connected clients except the one that sent the request
  })
  client.on('vote-band', (band) => {
    bands.voteBand(band.id);
    io.emit('active-bands', bands.getBands());
  })
  client.on('add-band', (band) => {
    console.log(band);
    bands.addBand(band);
    io.emit('active-bands', bands.getBands());
  })
  client.on('remove-band', (band) => {
    bands.deleteBand(band.id);
    io.emit('active-bands', bands.getBands());
  })
});