
const dnode = require('dnode');

const server = dnode(function (remote, conn) {
	this.sayHello = function (username, cb) {
		username = username || 'world';
		cb('Hello ' + username);
	};
});

server.listen(7070);
console.log(`Service is running on port 7070...`);
