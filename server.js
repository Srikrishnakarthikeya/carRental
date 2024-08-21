const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const User = require('./models/User');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

User.watch().on('change', change => {
  io.emit('carAvailabilityUpdate');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
