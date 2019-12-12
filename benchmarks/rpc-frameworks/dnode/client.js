
const dnode = require('dnode');

const foo = async (str) => {
	return new Promise(resolve => {
		dnode.connect(7070, function (remote, conn) {
			remote.zing(33, function (result) {
				conn.end();
				resolve(result);
			});
		});
	});
};

const main = async (times = 0) => {
	const result = await foo('beep');
	times <= 10 && console.log(result);
};

module.exports = main;
// main();
