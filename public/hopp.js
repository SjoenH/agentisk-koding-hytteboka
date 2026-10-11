// The show around a draw: a light that hops from ticket to ticket, fast at first and
// slower and slower, until it rests on the winner. The winner is already drawn by the
// server when the light starts; this only decides how the light gets there.

/**
 * The tickets the light visits, in order, and how many milliseconds it rests on each.
 * The last one is always the winner. All the rests together last `duration`.
 */
export function planHops(count, winner, { duration = 7000, least = 28 } = {}) {
  // With one ticket there is nowhere to hop: the light rests on it a moment.
  if (count === 1) return [{ index: 0, wait: 1500 }];

  // Whole rounds past every ticket, then on to the winner.
  const rounds = Math.max(1, Math.ceil((least - winner) / count));
  const hops = rounds * count + winner + 1;

  // Each rest is longer than the one before, and the last about 25 times the first.
  const weights = Array.from({ length: hops }, (_, hop) => 1 + 24 * (hop / (hops - 1)) ** 4);
  const total = weights.reduce((sum, weight) => sum + weight, 0);

  return weights.map((weight, hop) => ({ index: hop % count, wait: (duration * weight) / total }));
}
