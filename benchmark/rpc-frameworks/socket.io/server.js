
const io = require('socket.io')();

io.on('connection', client => {

	client.on('sayHi', (a1, a2) => {
		const result = a1 + ' ' + a2;
		client.emit('sayHi:ok', result);
	});

	client.on('disconnect', () => { /* … */ });
});

io.listen(3000);
