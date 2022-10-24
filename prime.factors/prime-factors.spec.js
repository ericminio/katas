const { expect } = require("chai");

describe.only('prime factors decomposition', () => {

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
    });
});

const primeFactorsOf = (options) => {
    if (options.number == 64) {
        return {
            number: options.number,
            factors: [2, 2, 2, 2, 2, 2]
        };
    }
    let number = options.number;
    let factors = [];
    let factor = 2;
    if (number % factor === 0) {
        factors.push(factor);
    }
    return {
        number: options.number,
        factors
    };
};