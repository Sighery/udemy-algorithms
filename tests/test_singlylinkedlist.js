import test from "ava";

import {SinglyLinkedList, SinglyLinkedListNode} from "../src/singlylinkedlist";
import {IndexError} from "../src/utils";


test("Test Linked List Node creation", t => {
	/**
	 * Test creation of a node works, and value is the expected, and next
	 * reference points to null since it's a single node
	 */
	const testNode = new SinglyLinkedListNode(1);
	t.is(testNode.value, 1);
	t.is(testNode.next, null);
});


test("Test empty Linked List creation", t => {
	const newList = new SinglyLinkedList();
	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 0);
	t.deepEqual(result, []);
});


test("Test Linked List creation", t => {
	const newList = new SinglyLinkedList(1);
	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 1);
	t.deepEqual(result, [1]);
});


test("Test Linked List append with empty list", t => {
	const newList = new SinglyLinkedList();
	newList.append(1);
	newList.append(2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test Linked List append with non-empty list", t => {
	const newList = new SinglyLinkedList(1);
	newList.append(2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test Linked List prepend with empty list", t => {
	const newList = new SinglyLinkedList();
	newList.prepend(2);
	newList.prepend(1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test Linked List prepend with non-empty list", t => {
	const newList = new SinglyLinkedList(2);
	newList.prepend(1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test iterList returns the same as looping over the references", t => {
	const newList = new SinglyLinkedList(1);
	newList.append(2);

	const result = Array.from(newList.iterList());
	const expected = [newList.head, newList.head.next];
	t.is(newList.length, 2);
	t.deepEqual(result, expected);
});


test("Test toString of empty Linked List", t => {
	const newList = new SinglyLinkedList();

	t.is(newList.toString(), "SinglyLinkedList()");
});


test("Test toString of one element Linked List", t => {
	const newList = new SinglyLinkedList(1);

	t.is(newList.toString(), "SinglyLinkedListNode 1");
});


test("Test toString of muliple elements Linked List", t => {
	const newList = new SinglyLinkedList(1);
	newList.append(2);

	t.is(
		newList.toString(),
		"SinglyLinkedListNode 1 ---> SinglyLinkedListNode 2"
	);
});


test("Test traverseToIndex throws IndexError with non-existing index", t => {
	const newList = new SinglyLinkedList();
	t.throws(
		() => newList.traverseToIndex(999),
		{
			instanceOf: IndexError,
			message: "Can't get non-existing index",
		}
	);
});


test("Test traverseToIndex throws IndexError with negative index", t => {
	const newList = new SinglyLinkedList();
	t.throws(
		() => newList.traverseToIndex(-999),
		{
			instanceOf: IndexError,
			message: "Can't get non-existing index",
		}
	);
});


test("Test traverseToIndex works if used as expected", t => {
	const newList = new SinglyLinkedList(1);
	newList.append(2);

	t.is(newList.traverseToIndex(1), newList.head.next);
});


test("Test insert on index 0 acts as prepend", t => {
	const newList = new SinglyLinkedList(2);
	newList.insert(0, 1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test insert on bigger than last index acts as append", t => {
	const newList = new SinglyLinkedList(1);
	newList.insert(999, 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 2]);
});


test("Test insert works if used as expected", t => {
	const newList = new SinglyLinkedList();
	newList.append(3);
	newList.prepend(1);
	newList.insert(1, 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(result.length, 3);
	t.deepEqual(result, [1, 2, 3]);
});


test("Test remove throws IndexError with non-existing index", t => {
	const newList = new SinglyLinkedList();
	t.throws(
		() => newList.remove(999),
		{
			instanceOf: IndexError,
			message: "Can't remove non-existing index",
		}
	);
});


test("Test remove throws IndexError with negative index", t => {
	const newList = new SinglyLinkedList();
	t.throws(
		() => newList.remove(-999),
		{
			instanceOf: IndexError,
			message: "Can't remove non-existing index",
		}
	);
});


test("Test remove on one element list empties it", t => {
	const newList = new SinglyLinkedList(1);

	t.is(newList.remove(0), 1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 0);
	t.deepEqual(result, []);
});


test("Test remove on index zero works as expected", t => {
	const newList = new SinglyLinkedList(1);
	newList.append(2);

	t.is(newList.remove(0), 1);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 1);
	t.deepEqual(result, [2]);
});


test("Test remove on last index works as expected", t => {
	const newList = new SinglyLinkedList(1);
	newList.append(2);

	t.is(newList.remove(1), 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 1);
	t.deepEqual(result, [1]);
});


test("Test remove on non-edge index works as expected", t => {
	const newList = new SinglyLinkedList(1);
	newList.append(2);
	newList.append(3);

	t.is(newList.remove(1), 2);

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(newList.length, 2);
	t.deepEqual(result, [1, 3]);
});


test("Test reverse works as expected", t => {
	const newList = new SinglyLinkedList(2);
	newList.prepend(1);
	newList.append(3);
	newList.reverse();

	const result = Array.from(newList.iterList()).map(x => x.value);
	t.is(result.length, 3);
	t.deepEqual(result, [3, 2, 1]);
});
