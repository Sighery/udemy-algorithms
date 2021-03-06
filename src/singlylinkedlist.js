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
		if (index >= this.length || index < 0) {
			throw new utils.IndexError("Can't remove non-existing index");
		} else if (index === 0 && this.length === 1) {
			const oldValue = this.head.value;

			this.head = null;
			this.tail = null;
			this.length = 0;

			return oldValue;
		} else if (index === 0) {
			const oldValue = this.head.value;

			this.head = this.head.next;
			this.length--;

			return oldValue;
		}

		const previousNode = this.traverseToIndex(index - 1);
		const indexNode = previousNode.next;
		const nextNode = indexNode.next;

		previousNode.next = nextNode;
		this.length--;

		return indexNode.value;
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
	}

	traverseToIndex(index) {
		if (index >= this.length || index < 0) {
			throw new utils.IndexError("Can't get non-existing index");
		}

		for (let [i, node] of utils.enumerate(this.iterList())) {
			if (i === index) {
				return node;
			}
		}
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


module.exports = {
	SinglyLinkedList: SinglyLinkedList,
	SinglyLinkedListNode: SinglyLinkedListNode,
};
