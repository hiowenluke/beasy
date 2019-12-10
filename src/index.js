
const spawn = require('child_process').spawn;
const caller = require('caller');
const path = require('path');
const Table = require('cli-table');

let cps = [];

let isDidBefore;
let isCompare;

const wait = async (ms = 1000) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
};

const killByPid = (pid) => {
	if (!pid) return;

	try {
		if (/^win/.test(process.platform)) {
			spawn("taskkill", ["/PID", pid, "/T", "/F"]);
		}
		else {
			process.kill(pid, 'SIGTERM');
		}
	}
	catch(e) {
		// console.log(e);
	}
};

const compare = (p) => {
	return (m,n) =>{
		return n[p] - m[p];
	}
};

const print = {
	breakLine(char = '-', length = 40) {
		const breakLine = char.repeat(length);
		console.log(breakLine);
	},

	title(topic, char, length) {
		this.breakLine(char, length);
		console.log(topic);
		this.breakLine(char, length);
	},

	table(name, data) {
		this.title(name, '=');

		const table = new Table({
			chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
				, 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
				, 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
				, 'right': '' , 'right-mid': '' , 'middle': ' ' },
			style: { 'padding-left': 0, 'padding-right': 0 }
		});

		data.forEach(result => {
			const {name, avgRate} = result;
			table.push([name, avgRate, 'times/sec']);
		});

		console.log(table.toString());
		this.breakLine('=');
	}
};

const me = {
	async compare(defs, times, runs) {
		const pathToCaller = caller();
		const root = path.resolve(pathToCaller, '..');

		isCompare = 1;

		const results = [];
		for (let i = 0; i < defs.length; i ++) {
			const def = defs[i];
			const {name, before, start} = def;

			print.title(name);

			let scripts = Array.isArray(before) ? before : [before];

			// Convert the relative path of script to absolute path
			scripts = scripts.map(script =>
				script.substr(0, 1) === '/' ? script : path.resolve(root, script)
			);

			this.before(...scripts);

			let fn = start;
			if (typeof fn === 'string') {
				let filePath = fn;
				if (filePath.substr(0, 1) === '.') {
					filePath = path.resolve(root, filePath);
				}

				fn = require(filePath);
			}

			const result = await this.start(fn, times, runs);
			result.name = name;

			results.push(result);
		}

		results.sort(compare("avgRate"));
		print.table('Results', results);

		process.exit();
	},

	before(...scripts) {
		if (!scripts.length) return;
		console.log(`Running scripts...`);

		const pathToCaller = caller();
		const root = path.resolve(pathToCaller, '..');

		cps = [];

		for (let i = 0; i < scripts.length; i ++) {
			const script = scripts[i];
			const filePath = script.substr(0, 1) === '/' ? script : root + '/' + script;

			setTimeout(() => {
				const cp = spawn('node', [filePath]);
				cps.push(cp);
			}, 10);
		}

		isDidBefore = 1;
	},

	async start(func, times = 100, runs = 10) {
		try {

			// Waiting for the scripts starting
			isDidBefore && await wait();

			console.log(`Benchmarking [${times}] times, [${runs}] runs.\nStarting...`);

			const duringArr = [];
			const rateArr = [];

			for (let i = 0; i < runs; i ++) {
				const result = await this.runOnce(func, times);
				const {during, rate} = result;
				console.log(`Run #${i + 1}: ${during} seconds, ${rate} times/sec`);

				duringArr.push(during);
				rateArr.push(rate);
			}

			const avgDuring = (duringArr.reduce((acc, val) => acc + val) / duringArr.length).toFixed(2);
			const avgRate = (rateArr.reduce((acc, val) => acc + val) / rateArr.length).toFixed(0);

			console.log(`Done.\nAverage: ${avgDuring} seconds, ${avgRate} times/sec`);

			// Exit all child processes
			cps.forEach(cp => killByPid(cp.pid));

			if (isCompare) {
				return {avgDuring, avgRate};
			}
			else {
				process.exit();
			}
		}
		catch(e) {
			console.log(e);
		}
	},

	async runOnce(func, times) {
		const startTime = new Date().getTime();

		const run = async () => {
			return new Promise(async resolve => {
				let count = 0;
				while (++count <= times) {
					await func(times, count);
				}

				resolve();
			});
		};

		await run();

		const endTime = new Date().getTime();
		const during = (endTime - startTime) / 1000 || 1;
		const rate = Math.floor(times / during);

		return {during, rate};
	}
};

const create = () => {
	return Object.create(me);
};

module.exports = create;
