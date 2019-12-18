
const io = require('socket.io')();

io.on('connection', client => {
	client.on('sayHello', (username = 'world') => {
		client.emit('sayHello:ok', 'Hello ' + username);
	});
});

io.listen(3000);
console.log(`Service is running on port 3000...`);
