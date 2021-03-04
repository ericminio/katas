let { expect } = require('chai')

describe('book shop', ()=>{

    it('can sell you 1 book', ()=>{
        expect(price({ 'one':1 })).to.equal(8.00)
    })
    it('can sell you 1 book twice', ()=>{
        expect(price({ 'one':2 })).to.equal(2*8.00)
    })
    it('offers a 5% discount for 2 different books', ()=>{
        expect(price({ 'one':1, 'two':1 })).to.equal(2*8*0.95)
    })
    it('offers a 5% discount for 2 different books, the double is full price', ()=>{
        expect(price({ 'one':1, 'two':2 })).to.equal(2*8*0.95 + 8.00)
    })
    it('offers a 10% discount for 3 different books', ()=>{
        expect(price({ 'one':1, 'two':1, 'three':1 })).to.equal(3*8*0.9)
    })
    it('offers a 20% discount for 4 different books', ()=>{
        expect(price({ 'one':2, 'two':2, 'three':2, 'four':1, 'five':1 })).to.equal(4*8*0.8 + 4*8*0.8)
    })
})

const UNITPRICE = 8.00
const discounts = [
    { count:4, rate:0.8 },
    { count:3, rate:0.9 },
    { count:2, rate:0.95 },
    { count:1, rate:1 }
]
const price = (basket)=> {
    let value = 0
    
    discounts.forEach((discount)=>{
        while (Object.keys(basket).length >= discount.count) {
            value += discount.count * UNITPRICE * discount.rate
            let keys = Object.keys(basket)
            for (var i=0; i<discount.count; i++) {
                let key = keys[i]
                basket[key] --
                if (basket[key] == 0) { delete basket[key] }
            }
        }    
    })

    return value
}