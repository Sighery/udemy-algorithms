import test from "ava";

import {Queue} from "../linkedlistqueue";
import {IndexError} from "../utils";


test("Test empty Queue creation", t => {
	t.notThrows(() => new Queue());
});


test("Test enqueue works as expected", t => {
	const newQueue = new Queue();
	newQueue.enqueue(1);
	newQueue.enqueue(2);

	const queueData = Array.from(newQueue.data.iterList()).map(x => x.value);
	t.deepEqual(queueData, [1, 2]);
});


test("Test isEmpty returns True if empty", t => {
	const newQueue = new Queue();

	t.true(newQueue.isEmpty());
});


test("Test isEmpty returns False if not empty", t => {
	const newQueue = new Queue();
	newQueue.enqueue(1);

	t.false(newQueue.isEmpty());
});


test("Test peek on empty Queue throws IndexError", t => {
	const newQueue = new Queue();

	const expectedError = {
		instanceOf: IndexError,
		message: "Can't peek on an empty Queue",
	};
	t.throws(() => newQueue.peek(), expectedError);
});


test("Test peek always returns first inserted element", t => {
	const newQueue = new Queue();

	newQueue.enqueue(1);
	t.is(newQueue.peek(), 1);

	newQueue.enqueue(2);
	t.is(newQueue.peek(), 1);
});


test("Test dequeue on empty Stack throws IndexError", t => {
	const newQueue = new Queue();

	const expectedError = {
		instanceOf: IndexError,
		message: "Can't dequeue on an empty Queue",
	};
	t.throws(() => newQueue.dequeue(), expectedError);
});


test("Test dequeue removes and returns first element", t => {
	const newQueue = new Queue();
	newQueue.enqueue(1);
	newQueue.enqueue(2);

	t.is(newQueue.dequeue(), 1);
	t.is(newQueue.dequeue(), 2);
});
