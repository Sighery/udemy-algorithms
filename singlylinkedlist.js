const utils = require("./utils.js");

class SinglyLinkedListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}


class SinglyLinkedList {
	constructor(value=null) {
		if (value !== null) {
			this.head = new SinglyLinkedListNode(value);
			this.tail = this.head;
			this.length = 1;
		} else {
			this.head = null;
			this.tail = null;
			this.length = 0;
		}
	}

	*iterList() {
		let currentNode = this.head;

		while (currentNode !== null) {
			yield currentNode;
			currentNode = currentNode.next;
		}
	}

	append(value) {
		const newNode = new SinglyLinkedListNode(value);

		if (this.head === null && this.tail === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			this.tail = newNode;
		}

		this.length++;

		return this;
	}

	prepend(value) {
		const newNode = new SinglyLinkedListNode(value);

		if (this.head === null && this.tail === null) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head = newNode;
		}

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

		const previousNode = this.traverseToIndex(index - 1);
		const indexNode = previousNode.next;
		const newNode = new SinglyLinkedListNode(value);
		newNode.next = indexNode;
		previousNode.next = newNode;
		this.length++;

		return this;
	}

	remove(index) {
		if (index === 0 && this.length <= 1) {
			this.head = null;
			this.tail = null;
			this.length = 0;

			return this;
		} else if (index === 0) {
			this.head = this.head.next;
			this.length--;

			return this;
		} else if (index >= this.length) {
			throw new Error("Can't remove non-existing index");
		}

		const previousNode = this.traverseToIndex(index - 1);
		const indexNode = previousNode.next;
		const nextNode = indexNode.next;

		previousNode.next = nextNode;
		this.length--;

		return this;
	}

	reverse() {
		let localHead = null;
		let localTail = null;
		let previousNode = null;

		for (let currentNode of this.iterList()) {
			const replicatedNode = new SinglyLinkedListNode(currentNode.value);

			if (localTail === null) {
				// First iteration
				localTail = replicatedNode;
				previousNode = replicatedNode;
				continue;
			}

			replicatedNode.next = previousNode;
			previousNode = replicatedNode;
			localHead = replicatedNode;
		}

		this.head = localHead;
		this.tail = localTail;

		return this;
	}

	traverseToIndex(index) {
		if (index >= this.length || index < 0) {
			throw new Error("Can't get non-existing index");
		}

		for (let [i, node] of utils.enumerate(this.iterList())) {
			if (i === index) {
				return node;
			}
		}

		throw new Error("Couldn't get index");
	}

	toString() {
		if (!this.length) {
			return "SinglyLinkedList()";
		}

		let output = "";

		for (let node of this.iterList()) {
			if (output === "") {
				output += `SinglyLinkedListNode ${node.value}`;
			} else {
				output += ` ---> SinglyLinkedListNode ${node.value}`;
			}
		}

		return output;
	}
}


if (typeof module != "undefined" && !module.parent) {
	// Only execute this if the file is run directly
	let test = new SinglyLinkedList(3);
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
}


module.exports = {
	SinglyLinkedList: SinglyLinkedList,
};
