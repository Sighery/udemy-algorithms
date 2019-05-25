const DoublyLinkedList = require("./doublylinkedlist.js").DoublyLinkedList;

class Stack {
	constructor(){
		this.data = null;
	}

	peek() {
		if (this.data !== null && this.data.length >= 1) {
			return this.data.traverseToIndex(-1).value;
		}
		return null;
	}

	push(value) {
		if (!this.data) {
			this.data = new DoublyLinkedList(value);
		} else {
			this.data.append(value);
		}
	}

	pop() {
		if (this.data !== null && this.data.length === 1) {
			this.data = null;
		} else if (this.data !== null && this.data.length > 1) {
			this.data.remove(-1);
		}
	}
}

if (typeof module != "undefined" && !module.parent) {
	// Only execute this if the file is run directly
	const myStack = new Stack();
	myStack.push("Google");
	console.log(myStack.peek());
	myStack.push("Udemy");
	console.log(myStack.peek());
	myStack.push("Discord");
	console.log(myStack.peek());
}


module.exports = {
	Stack: Stack,
};
