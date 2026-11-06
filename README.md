# @lp-labs/orcid-checksum

ORCID ISO7064 mod11-2 checksums and canonical formatting.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/orcid-checksum
```

## Working example

```js
import { validateOrcid, formatOrcid } from '@lp-labs/orcid-checksum';
if (!validateOrcid('0000000218250097') || formatOrcid('0000000218250097') !== '0000-0002-1825-0097')
  throw new Error('ORCID');
```

CommonJS: `const api = require('@lp-labs/orcid-checksum')`.

## Behavior, customization and limits

orcidCheckDigit(body15) computes iterative total=(total+digit)*2 and final(12-total%11)%11,10->X. validateOrcid requires16compact uppercase lastX or digit, returns false checksum mismatch only. formatOrcid validates then4-4-4-4 hyphens; parseOrcid requires exact19char hyphen layout. No URI/network lookup, account identity or registry assurance. O(16).

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function orcidCheckDigit(body: string): string;
export declare function validateOrcid(code: string): boolean;
export declare function formatOrcid(code: string): string;
export declare function parseOrcid(code: string): string;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
