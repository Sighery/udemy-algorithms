import test from "ava";

import {enumerate} from "../src/utils";


function* dummyGenerator() {
	const array = [1, 2, 3, 4];
	for (let item of array) {
		yield item;
	}
}


test("Test enumerate with default arguments", t => {
	const values = Array.from(enumerate(dummyGenerator()));
	t.deepEqual(values, [[0, 1], [1, 2], [2, 3], [3, 4]]);
});


test("Test enumerate with negative start and step", t => {
	const values = Array.from(enumerate(dummyGenerator(), -1, -1));
	t.deepEqual(values, [[-1, 1], [-2, 2], [-3, 3], [-4, 4]]);
});
