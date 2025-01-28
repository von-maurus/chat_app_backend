const { connectUser, disconnectUser, saveMessage } = require('../controllers/socket');
const { verifyToken } = require('../helpers/jwt');
const { io } = require('../index');

// Socket msgs
io.on('connection', client => {
  console.log("Client connected");
  console.log(client.handshake.headers);
  // verify token
  if (client.handshake.headers['x-token'] === undefined) {
    disconnectUser(uid)
    return client.disconnect();
  }
  const { ok, uid } = verifyToken(client.handshake.headers['x-token']);

  if (!ok) {
    disconnectUser(uid)
    return client.disconnect();
  }
  console.log("Client authenticated", uid);
  // Authenticated user and connect to socket
  connectUser(uid);

  // Join user to a specific room
  client.join(uid);

  // Listen to client messages
  client.on('p-msg', async (payload) => {
    console.log("p-msg received...", payload)
    await saveMessage(payload);
    io.to(payload.to).emit('p-msg', payload);
  });

  client.on('disconnect', () => {
    disconnectUser(uid)
    console.log("Client disconnected")
  });

  client.on("request", (payload) => {
    console.log("Request received...", payload)
  })
});