const { expect } = require('chai');

describe('prime factors', () => {

    it('can decompose a number that is a power of two', () => {
        expect(primeFactorsOf({ number: 64 })).to.deep.equal({
            number: 64,
            factors: [2, 2, 2, 2, 2, 2]
        });
    });

    describe('steps towards decomposition of power of twos', () => {
        it('is easy with 2', () => {
            expect(primeFactorsOf({ number: 2 })).to.deep.equal({
                number: 2,
                factors: [2]
            });
        });
        it('is more work with 4', () => {
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
        if (number % factor == 0) {
            factors.push(factor);
            number /= factor;
        }
    }

    return {
        number: options.number,
        factors
    };
}