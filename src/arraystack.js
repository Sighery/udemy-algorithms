const IndexError = require("./utils.js").IndexError;


class Stack {
	constructor() {
		this.data = [];
	}

	peek() {
		if (this.data.length >= 1) {
			return this.data[this.data.length - 1];
		}

		throw new IndexError("Can't peek on an empty Stack");
	}

	push(value) {
		return this.data.push(value);
	}

	pop() {
		if (this.data.length >= 1) {
			return this.data.pop();
		}

		throw new IndexError("Can't pop on an empty Stack");
	}
}


module.exports = {
	Stack: Stack,
};
