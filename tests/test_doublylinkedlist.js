import test from "ava";

import {DoublyLinkedList, DoublyLinkedListNode} from "../doublylinkedlist";
import {IndexError} from "../utils";


test("Test Linked List Node creation", t => {
	/**
	 * Test creation of a node works, value is the expected, and next and prev
	 * references points to null since it's a single node
	 */
	const testNode = new DoublyLinkedListNode(1);
	t.is(testNode.value, 1);
	t.is(testNode.next, null);
	t.is(testNode.prev, null);
});


test("Test empty Linked List creation", t => {
	const newList = new DoublyLinkedList();
	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 0);
	t.deepEqual(result, []);
});


test("Test Linked List creation", t => {
	const newList = new DoublyLinkedList(1);
	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 1);
	t.deepEqual(result, [1]);
});


test("Test Linked List append with empty list", t => {
	const newList = new DoublyLinkedList();
	newList.append(1);
	newList.append(2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test Linked List append with non-empty list", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test Linked List prepend with empty list", t => {
	const newList = new DoublyLinkedList();
	newList.prepend(2);
	newList.prepend(1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test Linked List prepend with non-empty list", t => {
	const newList = new DoublyLinkedList(2);
	newList.prepend(1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test iterList returns the same as looping over the references", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);

	const result = Array.from(newList.iterList());
	const expected = [newList.head, newList.head.next];
	t.is(newList.length, 2);
	t.deepEqual(result, expected);
});


test("Test iterList reversed returns the same as looping over the references", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);

	const result = Array.from(newList.iterList(true));
	const expected = [newList.tail, newList.tail.prev];
	t.is(newList.length, 2);
	t.deepEqual(result, expected);
});


test("Test toString of empty Linked List", t => {
	const newList = new DoublyLinkedList();

	t.is(newList.toString(), "DoublyLinkedList()");
});


test("Test toString of one element Linked List", t => {
	const newList = new DoublyLinkedList(1);

	t.is(newList.toString(), "DoublyLinkedListNode 1");
});


test("Test toString of muliple elements Linked List", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);

	t.is(
		newList.toString(),
		"DoublyLinkedListNode 1 <---> DoublyLinkedListNode 2"
	);
});


test("Test traverseToIndex throws IndexError with non-existing positive index", t => {
	const newList = new DoublyLinkedList();
	t.throws(
		() => newList.traverseToIndex(999),
		{
			instanceOf: IndexError,
			message: "Can't get non-existing index",
		}
	);
});


test("Test traverseToIndex throws IndexError with non-existing negative index", t => {
	const newList = new DoublyLinkedList();
	t.throws(
		() => newList.traverseToIndex(-999),
		{
			instanceOf: IndexError,
			message: "Can't get non-existing index",
		}
	);
});


test("Test traverseToIndex works with positive index if used as expected", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);
	newList.append(3);

	t.is(newList.traverseToIndex(0), newList.head);
	t.is(newList.traverseToIndex(1), newList.head.next);
	t.is(newList.traverseToIndex(2), newList.tail);
});


test("Test traverseToIndex works with negative index if used as expected", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);
	newList.append(3);

	t.is(newList.traverseToIndex(-1), newList.tail);
	t.is(newList.traverseToIndex(-2), newList.tail.prev);
	t.is(newList.traverseToIndex(-3), newList.head);
});


test("Test insert on index 0 acts as prepend", t => {
	const newList = new DoublyLinkedList(2);
	newList.insert(0, 1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test insert on smaller than last negative index acts as prepend", t => {
	const newList = new DoublyLinkedList(2);
	newList.insert(-999, 1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test insert on bigger than last index acts as append", t => {
	const newList = new DoublyLinkedList(1);
	newList.insert(999, 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test insert on index -1 inserts before last element", t => {
	const newList = new DoublyLinkedList(2);
	newList.insert(-1, 1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test insert works with positive index if used as expected", t => {
	const newList = new DoublyLinkedList();
	newList.append(3);
	newList.prepend(1);
	newList.insert(1, 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(result.length, 3);
	t.deepEqual(result, [1, 2, 3]);
});


test("Test insert works with negative index if used as expected", t => {
	const newList = new DoublyLinkedList();
	newList.append(3);
	newList.prepend(1);
	newList.insert(-1, 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(result.length, 3);
	t.deepEqual(result, [1, 2, 3]);
});


test("Test remove throws IndexError with positive non-existing index", t => {
	const newList = new DoublyLinkedList();
	t.throws(
		() => newList.remove(999),
		{
			instanceOf: IndexError,
			message: "Can't remove non-existing index",
		}
	);
});


test("Test remove throws IndexError with negative non-existing index", t => {
	const newList = new DoublyLinkedList();
	t.throws(
		() => newList.remove(999),
		{
			instanceOf: IndexError,
			message: "Can't remove non-existing index",
		}
	);
});


test("Test remove on one element list empties it", t => {
	const newList = new DoublyLinkedList(1);

	t.is(newList.remove(0), 1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 0);
	t.deepEqual(result, []);
});


test("Test remove on index zero works as expected", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);

	t.is(newList.remove(0), 1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 1);
	t.deepEqual(result, [2]);
});


test("Test remove on index -1 works as expected", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);

	t.is(newList.remove(-1), 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 1);
	t.deepEqual(result, [1]);
});


test("Test remove on last positive index works as expected", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);

	t.is(newList.remove(1), 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 1);
	t.deepEqual(result, [1]);
});


test("Test remove on last negative index works as expected", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);

	t.is(newList.remove(-2), 1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 1);
	t.deepEqual(result, [2]);
});


test("Test remove on non-edge positive index works as expected", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);
	newList.append(3);

	t.is(newList.remove(1), 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 3]);
});


test("Test remove on non-edge negative index works as expected", t => {
	const newList = new DoublyLinkedList(1);
	newList.append(2);
	newList.append(3);

	t.is(newList.remove(-2), 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 3]);
});


test("Test reverse works as expected", t => {
	const newList = new DoublyLinkedList(2);
	newList.prepend(1);
	newList.append(3);
	newList.reverse();

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(result.length, 3);
	t.deepEqual(result, [3, 2, 1]);
});
