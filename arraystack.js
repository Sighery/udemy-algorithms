class Stack {
	constructor(){
		this.data = [];
	}

	peek() {
		if (this.data.length >= 1) {
			return this.data[this.data.length - 1];
		}

		return null;
	}

	push(value) {
		return this.data.push(value);
	}

	pop() {
		return this.data.pop();
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
	console.log("Removing elements...");
	console.log(myStack.pop());
	console.log(myStack.pop());
	console.log(myStack.pop());
}


module.exports = {
	Stack: Stack,
};
