import {formatCurrency} from '../../scripts/utils/price.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2099)).toEqual('20.99');
  });

  it('zero value input', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounding to nearest', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});