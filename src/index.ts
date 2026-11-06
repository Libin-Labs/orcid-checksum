function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
export function orcidCheckDigit(body: string): string {
  strictText(body, 15);
  if (body.length !== 15 || /[^0-9]/.test(body)) throw new RangeError('ORCID15 body');
  let total = 0;
  for (const d of body) total = (total + Number(d)) * 2;
  const check = (12 - (total % 11)) % 11;
  return check === 10 ? 'X' : String(check);
}
export function validateOrcid(code: string): boolean {
  strictText(code, 16);
  if (code.length !== 16 || /[^0-9]/.test(code.slice(0, 15)) || /[^0-9X]/.test(code[15]!))
    throw new RangeError('ORCID16 syntax');
  return orcidCheckDigit(code.slice(0, 15)) === code[15];
}
export function formatOrcid(code: string): string {
  if (!validateOrcid(code)) throw new RangeError('ORCID checksum mismatch');
  return [code.slice(0, 4), code.slice(4, 8), code.slice(8, 12), code.slice(12)].join('-');
}
export function parseOrcid(code: string): string {
  strictText(code, 19);
  if (code.length !== 19 || code[4] !== '-' || code[9] !== '-' || code[14] !== '-')
    throw new RangeError('ORCID4-4-4-4 syntax');
  const compact = code.split('-').join('');
  if (!validateOrcid(compact)) throw new RangeError('ORCID checksum mismatch');
  return compact;
}
