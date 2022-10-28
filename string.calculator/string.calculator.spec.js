import { expect } from 'chai';
import { Calculator } from './string.calculator.js';

describe('string calculator', () => {

    let calculator
    beforeEach(() => {
        calculator = new Calculator()
    })
    it('can calculate a number', () => {
        expect(calculator.calculate('2.5')).to.equal(2.50)
    })
    it('can add two numbers', () => {
        expect(calculator.calculate('2.5 + 1.1')).to.equal(3.60)
    })
    it('can add three numbers', () => {
        expect(calculator.calculate('2.5 + 1.1 + 2.2')).to.equal(5.8)
    })
    it('can multiply two numbers', () => {
        expect(calculator.calculate('3*5')).to.equal(15)
    })
    it('respects priorities', () => {
        expect(calculator.calculate('2 + 3*5')).to.equal(17)
    })
    it('allow priorities overwrite', () => {
        expect(calculator.calculate('(2 + 3)*5')).to.equal(25)
    })
    it('supports nested parenthesis', () => {
        expect(calculator.calculate('2 * (2 * (3+3) + 3)')).to.equal(30)
    })
    it('accepts variables', () => {
        expect(calculator.calculate('x+y', { x: 1, y: 2 })).to.equal(3)
    })
    it('can brag', () => {
        expect(calculator.calculate('x+y*(5*z)', { x: 1, y: 2, z: 3 })).to.equal(31)
    })
})
