import test from "ava";

import {Stack} from "../src/arraystack";
import {IndexError} from "../src/utils";


test("Test empty Stack creation", t => {
	const newStack = new Stack();

	t.deepEqual(newStack.data, []);
});


test("Test push works as expected", t => {
	const newStack = new Stack();
	newStack.push(1);
	newStack.push(2);

	t.deepEqual(newStack.data, [1, 2]);
});


test("Test peek on empty Stack throws IndexError", t => {
	const newStack = new Stack();

	const expectedError = {
		instanceOf: IndexError,
		message: "Can't peek on an empty Stack",
	};
	t.throws(() => newStack.peek(), expectedError);
});


test("Test peek returns last inserted element", t => {
	const newStack = new Stack();

	newStack.push(1);
	t.is(newStack.peek(), 1);

	newStack.push(2);
	t.is(newStack.peek(), 2);
});


test("Test pop on empty Stack throws IndexError", t => {
	const newStack = new Stack();

	const expectedError = {
		instanceOf: IndexError,
		message: "Can't pop on an empty Stack",
	};
	t.throws(() => newStack.pop(), expectedError);
});


test("Test pop removes and returns last element", t => {
	const newStack = new Stack();
	newStack.push(1);
	newStack.push(2);

	t.is(newStack.pop(), 2);
	t.is(newStack.pop(), 1);
});
