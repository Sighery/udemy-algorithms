function* enumerate(iterator, start=0, step=1) {
	for (let value of iterator) {
		yield [start, value];
		start = start + step;
	}
}

class IndexError extends Error {}

module.exports = {
	enumerate: enumerate,
	IndexError: IndexError,
};
