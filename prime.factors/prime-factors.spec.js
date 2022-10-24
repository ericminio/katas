const { expect } = require("chai");

describe('prime factors decomposition', () => {

    it('can decompose a number that is a power of two', () => {
        expect(primeFactorsOf({ number: 64 })).to.deep.equal({
            number: 64,
            factors: [2, 2, 2, 2, 2, 2]
        });
    });

    describe('steps towards power of twos decomposition', () => {

        it('is easy with 2', () => {
            expect(primeFactorsOf({ number: 2 })).to.deep.equal({
                number: 2,
                factors: [2]
            });
        });
        it('takes more work for 4', () => {
            expect(primeFactorsOf({ number: 4 })).to.deep.equal({
                number: 4,
                factors: [2, 2]
            });
        });
    });
});

const primeFactorsOf = (options) => {
    let number = options.number;
    let factors = [];
    let factor = 2;
    while (number > 1) {
        if (number % factor === 0) {
            factors.push(factor);
            number /= factor;
        }
    }
    return {
        number: options.number,
        factors
    };
};