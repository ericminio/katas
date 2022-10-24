const { expect } = require("chai");

describe.only('prime factors decomposition', () => {

    it('can decompose a number that is a power of two', () => {
        expect(primeFactorsOf({ number: 64 })).to.deep.equal({
            number: 64,
            factors: [2, 2, 2, 2, 2, 2]
        });
    });
});