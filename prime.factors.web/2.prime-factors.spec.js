import { expect } from 'chai';
import { code } from './code.js';
const primeFactorsOf = code('./prime.factors.web/prime-factors.js', 'primeFactorsOf');

describe.only('prime factors decomposition', () => {

    it('works for customer example', () => {
        expect(primeFactorsOf(42)).to.deep.equal([2, 3, 7]);
    });
});