import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('known ORCID', () => {
  assert.ok(api.validateOrcid('0000000218250097'));
});
test('format and parse', () => {
  assert.equal(api.formatOrcid('0000000218250097'), '0000-0002-1825-0097');
  assert.equal(api.parseOrcid('0000-0002-1825-0097'), '0000000218250097');
});
test('known X check', () => {
  assert.ok(api.validateOrcid('000000021694233X'));
});
test('checksum false', () => {
  assert.equal(api.validateOrcid('0000000218250098'), false);
});
test('syntax rejection', () => {
  assert.throws(() => api.validateOrcid('0000-0002-1825-0097'));
  assert.throws(() => api.parseOrcid('00000002-1825-0097'));
});
test('weighted recurrence oracle', () => {
  for (let i = 0; i < 200; i++) {
    const body = String(i * 173).padStart(15, '0');
    let remainder = 0;
    for (const d of body) remainder = (2 * (remainder + Number(d))) % 11;
    const digit = (12 - remainder) % 11;
    assert.equal(api.orcidCheckDigit(body), digit === 10 ? 'X' : String(digit));
  }
});
