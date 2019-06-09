function* enumerate(iterator, start=0, step=1) {
	for (let value of iterator) {
		yield [start, value];
		start = start + step;
	}
}

module.exports = {
	enumerate: enumerate,
};
