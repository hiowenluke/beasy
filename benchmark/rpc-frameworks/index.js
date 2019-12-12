
const be = require('../..')();

be.compare([
	{
		name: 'booms',
		before: './booms/service',
		start: './booms/client',
	},

	{
		name: 'gRPC-node',
		before: './gRPC-node/greeter_server',
		start: './gRPC-node/greeter_client',
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
