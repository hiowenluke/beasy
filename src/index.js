
const me = {
	async start(func, maxTimes) {
		const startTime = new Date().getTime();

		let count = 0;
		while(++ count <= maxTimes) {
			await func(count);
		}

		this.done(maxTimes, startTime);
	},

	done(maxTimes, startTime) {
		const endTime = new Date().getTime();
		const during = (endTime - startTime) / 1000;
		const avg = Math.floor(maxTimes / during);
		console.log(`Done. ${maxTimes} times, ${during} seconds, ${avg}/s`);
	}
};

const create = () => {
	return Object.create(me);
};

module.exports = create;
