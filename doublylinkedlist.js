const utils = require("./utils.js");

class DoublyLinkedListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}


class DoublyLinkedList {
	constructor(value) {
		this.head = new DoublyLinkedListNode(value);
		this.tail = this.head;
		this.length = 1;
	}

	*iterList(reversed=false) {
		let currentNode = null;
		let link = null;

		if (reversed) {
			currentNode = this.tail;
			link = "prev";
		} else {
			currentNode = this.head;
			link = "next";
		}

		while (currentNode !== null) {
			yield currentNode;
			currentNode = currentNode[link];
		}
	}

	append(value) {
		const newNode = new DoublyLinkedListNode(value);
		newNode.prev = this.tail;
		this.tail.next = newNode;
		this.tail = newNode;
		this.length++;

		return this;
	}

	prepend(value) {
		const newNode = new DoublyLinkedListNode(value);
		this.head.prev = newNode;
		newNode.next = this.head;
		this.head = newNode;
		this.length++;

		return this;
	}

	insert(index, value) {
		if (index === 0) {
			this.prepend(value);
			return this;
		} else if (index >= this.length) {
			this.append(value);
			return this;
		}

		const indexNode = this.traverseToIndex(index);
		const previousNode = indexNode.prev;
		const newNode = new DoublyLinkedListNode(value);
		newNode.prev = previousNode;
		newNode.next = indexNode;
		indexNode.prev = newNode;
		previousNode.next = newNode;
		this.length++;

		return this;
	}

	remove(index) {
		if (this.length <= 1) {
			throw new Error("Can't remove when there's only one node left");
		} else if (index === 0) {
			this.head = this.head.next;
			this.head.prev = null;
			this.length--;

			return this;
		} else if (index === (this.length -1) || index === -1) {
			this.tail = this.tail.prev;
			this.tail.next = null;
			this.length--;

			return this;
		} else if (index >= this.length) {
			throw new utils.IndexError("Can't remove non-existing index");
		}

		const indexNode = this.traverseToIndex(index);
		const previousNode = indexNode.prev;
		const nextNode = indexNode.next;

		previousNode.next = nextNode;
		nextNode.prev = previousNode;
		this.length--;

		return this;
	}

	reverse() {
		let localHead = null;
		let localTail = null;
		let previousNode = null;

		for (let [i, currentNode] of utils.enumerate(this.iterList(true))) {
			let replicatedNode = new DoublyLinkedListNode(currentNode.value);
			replicatedNode.next = currentNode.next;
			replicatedNode.prev = currentNode.prev;

			if (i === 0) {
				replicatedNode.prev = null;
				localHead = replicatedNode;
			} else {
				previousNode.next = replicatedNode;
				replicatedNode.prev = previousNode;
			}

			previousNode = replicatedNode;

			if (i === (this.length - 1)) {
				replicatedNode.next = null;
				localTail = replicatedNode;
			}
		}

		this.head = localHead;
		this.tail = localTail;

		return this;
	}

	traverseToIndex(index) {
		if (index >= this.length || index < -this.length) {
			throw new utils.IndexError("Can't get non-existing index");
		}

		// Small optimization here. If index > (length / 2) then start looping
		// from the end instead
		if (index > 0 && index > (this.length / 2)) {
			index = index - this.length;
		}

		let start = 0;
		let step = 1;
		let iterReversed = false;
		if (index < 0) {
			start = -1;
			step = -1;
			iterReversed = true;
		}

		let generator = utils.enumerate(
			this.iterList(iterReversed), start, step
		);
		for (let [i, node] of generator) {
			if (i === index) {
				return node;
			}
		}
	}

	toString() {
		let output = "";

		for (let node of this.iterList()) {
			if (output === "") {
				output += `DoublyLinkedListNode ${node.value}`;
			} else {
				output += ` <---> DoublyLinkedListNode ${node.value}`;
			}
		}

		return output;
	}
}


if (typeof module != "undefined" && !module.parent) {
	// Only execute this if the file is run directly
	let test = new DoublyLinkedList(3);
	test.append(2);
	test.prepend(5);
	console.log(test.toString());
	test.insert(1, 4);
	console.log(test.toString());
	test.insert(1, 6);
	console.log(test.toString());
	test.remove(1);
	console.log(test.toString());
	test.reverse();
	console.log(test.toString());
	console.log(Array.from(test.iterList()).map(x => x.value));
	console.log(
		"Reverse order: ",
		Array.from(test.iterList(true)).map(x => x.value)
	);
}


module.exports = {
	DoublyLinkedList: DoublyLinkedList,
	DoublyLinkedListNode: DoublyLinkedListNode,
};
