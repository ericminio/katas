const { expect } = require("chai");

describe.only('prime factors decomposition', () => {

    it('can decompose a number', () => {
        expect(decompose(300)).to.deep.equal([2, 2, 3, 5, 5]);
    });
})