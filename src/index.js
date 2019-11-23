
const me = {
	startTime: null,
	handler: null,
	count: 0,
	maxTimes: 0,

	async start(func, maxTimes) {
		this.count = 0;
		this.maxTimes = maxTimes;
		this.startTime = new Date().getTime();

		this.handler = setInterval(() => {this.verify()}, 1);

		while(++ this.count <= maxTimes) {
			await func(this.count);
		}
	},

	verify() {
		let count = this.count;
		if (count < this.maxTimes) {
			return;
		}

		clearInterval(this.handler);

		count --;

		const endTime = new Date().getTime();
		const during = (endTime - this.startTime) / 1000;
		const avg = Math.floor(count / during);
		console.log(`Done. ${count} times, ${during} seconds, ${avg}/s`);
	}
};

const create = () => {
	return Object.create(me);
};

module.exports = create;
