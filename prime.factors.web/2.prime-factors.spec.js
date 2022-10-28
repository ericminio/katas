import { expect } from 'chai';
import { code } from './code.js';
const primeFactorsOf = code('./prime.factors.web/prime-factors.js', 'primeFactorsOf');

describe('prime factors decomposition', () => {

    it('works for customer example', () => {
        expect(primeFactorsOf(42)).to.deep.equal([2, 3, 7]);
    });

    describe('steps', () => {

        it('works for 2', () => {
            expect(primeFactorsOf(2)).to.deep.equal([2]);
        });
        it('works for 4', () => {
            expect(primeFactorsOf(4)).to.deep.equal([2, 2]);
        });
        it('works for 9', () => {
            expect(primeFactorsOf(9)).to.deep.equal([3, 3]);
        });
        it('works for 6', () => {
            expect(primeFactorsOf(6)).to.deep.equal([2, 3]);
        });
    });
});