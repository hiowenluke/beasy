
const dnode = require('dnode');

const server = dnode(function (remote, conn) {
	this.zing = function (n, cb) { cb(n * 100) };
});

server.listen(7070);
