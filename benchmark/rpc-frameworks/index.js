
const be = require('../..')();

be.compare([
	{
		name: 'dooms',
		before: './dooms/service',
		start: './dooms/client',
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
