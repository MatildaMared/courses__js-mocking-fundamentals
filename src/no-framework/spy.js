/**
 * Task: implement a `spyOn`.
 *
 * Execute: Use `npx jest --watch src/no-framework/spy.js` to watch the test
 */

const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

function fn(impl = () => {}) {
	const mockFn = (...args) => {
		mockFn.mock.calls.push(args);
		return impl(...args);
	};
	mockFn.mock = { calls: [] };
	mockFn.mockImplementation = (newImpl) => (impl = newImpl);
	return mockFn;
}

function spyOn(obj, name) {
	const originalValue = obj[name];

	obj[name] = fn();
	obj[name].mockRestore = () => (obj[name] = originalValue);
}

spyOn(utils, "getWinner");
utils.getWinner.mockImplementation((p1, p2) => p1);

const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
	["Kent C. Dodds", "Ken Wheeler"],
	["Kent C. Dodds", "Ken Wheeler"],
]);

// cleanup
utils.getWinner.mockRestore();

/**
 * Checkout master branch to see the answer.
 */
