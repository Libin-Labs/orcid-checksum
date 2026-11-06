import { validateOrcid, formatOrcid } from '@lp-labs/orcid-checksum';
if (!validateOrcid('0000000218250097') || formatOrcid('0000000218250097') !== '0000-0002-1825-0097')
  throw new Error('ORCID');
// @ts-expect-error invalid argument must be rejected by declarations
validateOrcid(123);
