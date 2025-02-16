const {Server} = require('socket.io');
const io = new Server(3001, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Users will hold all the connected clients to the server.
let users = [];
io.on('connection', (socket) => {
    const username = socket.handshake.query.username;
    console.log(username + " logged in to the server");
    let user = {
        socketId: socket.id,
        username: username
    }
    users.push(user);

    // Handle disconnection
    socket.on('disconnect', () => {
        users = users.filter((user) => user.socketId !== socket.id);
    });

    // Handle receiving messages
    socket.on('message', (data) => {
        onMessage(data)
    });
})

const onMessage = (data) => {
    const {sender, recipient, message} = data;
    const recipientSocket = users.find((user) => user.username === recipient);

    if (recipientSocket) {
        io.to(recipientSocket.socketId).emit('message', {sender: data.sender, message: message});
    } else {
        console.log(`Recipient ${recipient} not found`);
    }
}

module.exports = {onMessage}