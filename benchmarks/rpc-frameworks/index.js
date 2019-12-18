
const be = require('../..')();

be.compare([
	{
		name: 'booms',
		before: './booms/server',
		start: './booms/client',
	},

	{
		name: 'gRPC-node',
		before: './gRPC-node/server',
		start: './gRPC-node/client',
	},

	{
		name: 'socket.io',
		before: './socket.io/server',
		start: './socket.io/client',
	},

	{
		name: 'dnode',
		before: './dnode/server',
		start: './dnode/client',
	}

], 1000);
