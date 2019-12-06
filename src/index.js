
const me = {
	async start(func, maxTimes) {
		console.log(`Benchmark [${maxTimes}] times starting...`);

		let startTime;

		const run = async () => {
			return new Promise(async resolve => {
				setTimeout(async () => {
					startTime = new Date().getTime();

					let count = 0;
					while(++ count <= maxTimes) {
						await func(count);
					}

					resolve();
				}, 10);
			})
		};

		await run();
		this.done(maxTimes, startTime);
	},

	done(maxTimes, startTime) {
		const endTime = new Date().getTime();
		const during = (endTime - startTime) / 1000;
		const avg = Math.floor(maxTimes / during);
		console.log(`Done. ${during} seconds, ${avg} times/sec.`);
		process.exit();
	}
};

const create = () => {
	return Object.create(me);
};

module.exports = create;
