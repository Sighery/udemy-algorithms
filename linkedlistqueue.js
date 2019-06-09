const SinglyLinkedList = require("./singlylinkedlist.js").SinglyLinkedList;


class Queue {
	constructor() {
		this.data = null;
	}

	peek() {
		if (this.data !== null) {
			return this.data.traverseToIndex(0).value;
		}

		return null;
	}

	enqueue(value) {
		if (!this.data) {
			this.data = new SinglyLinkedList(value);
		} else {
			this.data.append(value);
		}
	}

	dequeue() {
		if (this.data === null || this.data.length === 1) {
			this.data = null;
		} else {
			this.data.remove(0);
		}
	}
}


if (typeof module != "undefined" && !module.parent) {
	// Only execute this if the file is run directly
	const myQueue = new Queue();
	myQueue.enqueue("Joy");
	myQueue.enqueue("Matt");
	myQueue.enqueue("Pavel");
	myQueue.enqueue("Samir");
	console.log(myQueue.peek());
	myQueue.dequeue();
	console.log(myQueue.peek());
	myQueue.dequeue();
	console.log(myQueue.peek());
	myQueue.dequeue();
	console.log(myQueue.peek());
	myQueue.dequeue();
	console.log(myQueue.peek());
}

module.exports = {
	Queue: Queue,
};
