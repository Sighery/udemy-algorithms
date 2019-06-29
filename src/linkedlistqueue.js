const SinglyLinkedList = require("./singlylinkedlist.js").SinglyLinkedList;
const IndexError = require("./utils.js").IndexError;


class Queue {
	constructor() {
		this.data = new SinglyLinkedList();
	}

	peek() {
		if (this.isEmpty()) {
			throw new IndexError("Can't peek on an empty Queue");
		}

		return this.data.traverseToIndex(0).value;
	}

	enqueue(value) {
		this.data.append(value);
	}

	dequeue() {
		if (this.isEmpty()) {
			throw new IndexError("Can't dequeue on an empty Queue");
		}

		return this.data.remove(0);
	}

	isEmpty() {
		return this.data.length === 0;
	}
}


module.exports = {
	Queue: Queue,
};
