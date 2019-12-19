
const options = {
	redis: {
		host: 'localhost',
	}
};

const servers = require('booms').client.servers(options);
module.exports = servers;
