import assert from 'node:assert/strict';
import { test } from 'node:test';
import { planHops } from '../public/hopp.js';

const sum = (hops) => hops.reduce((total, hop) => total + hop.wait, 0);

test('the light always ends on the winner, whoever it is and however many are in the draw', () => {
  for (let count = 1; count <= 45; count += 1) {
    for (let winner = 0; winner < count; winner += 1) {
      const hops = planHops(count, winner);
      assert.equal(hops.at(-1).index, winner, `${count} tickets, winner ${winner}`);
      assert.ok(hops.every((hop) => Number.isInteger(hop.index) && hop.index >= 0 && hop.index < count));
    }
  }
});

test('the light goes from ticket to ticket in order, past every one of them at least once', () => {
  const hops = planHops(5, 3);
  hops.forEach((hop, at) => assert.equal(hop.index, at % 5));
  assert.ok(hops.length >= 28);

  const many = planHops(40, 0);
  assert.equal(many.length, 41, 'one round past all forty, then the winner');
});

test('the show lasts seven seconds, whether three or forty are in the draw', () => {
  for (const [count, winner] of [[2, 0], [3, 1], [12, 11], [40, 0], [40, 39]]) {
    assert.ok(Math.abs(sum(planHops(count, winner)) - 7000) < 1, `${count} tickets`);
  }
  assert.ok(Math.abs(sum(planHops(3, 1, { duration: 3000 })) - 3000) < 1);
});

test('the light slows down all the way, and rests longest on the winner', () => {
  const hops = planHops(8, 5);
  for (let at = 1; at < hops.length; at += 1) assert.ok(hops[at].wait > hops[at - 1].wait);
  assert.ok(hops[0].wait < 80, 'fast at first');
  assert.ok(hops.at(-1).wait > 600, 'slow at the end');
});

test('with one ticket the light rests on it', () => {
  assert.deepEqual(planHops(1, 0), [{ index: 0, wait: 1500 }]);
});
