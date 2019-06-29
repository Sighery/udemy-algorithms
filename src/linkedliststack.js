const SinglyLinkedList = require("./singlylinkedlist.js").SinglyLinkedList;
const IndexError = require("./utils.js").IndexError;


class Stack {
	constructor() {
		this.data = new SinglyLinkedList();
	}

	peek() {
		if (this.data.length === 0) {
			throw new IndexError("Can't peek on an empty Stack");
		}

		return this.data.traverseToIndex(0).value;
	}

	push(value) {
		this.data.prepend(value);
	}

	pop() {
		if (this.data.length === 0) {
			throw new IndexError("Can't pop on an empty Stack");
		}

		return this.data.remove(0);
	}
}


module.exports = {
	Stack: Stack,
};
