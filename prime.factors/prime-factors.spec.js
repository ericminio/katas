const { expect } = require("chai");

describe.only('prime factors decomposition', () => {

    it('can decompose a number', () => {
        expect(primeFactorsOf({ number: 300 })).to.deep.equal({
            number: 300,
            factors: [2, 2, 3, 5, 5]
        });
    });
})