import { expect } from 'chai'

describe('elevator-one-list', () => {

    let lift
    beforeEach(() => {
        lift = new Lift()
    })
    it('starts from the ground', () => {
        expect(lift.floor).to.equal(0)
    })
    it('starts waiting', () => {
        expect(lift.state).to.equal('waiting')
    })

    it('records calls', () => {
        lift.calledFrom(10)
        lift.calledFrom(1)
        expect(lift.calls).to.deep.equal([10, 1])
    })
    it('will go up when first call is from above', () => {
        lift.calledFrom(10)
        lift.calledFrom(1)
        expect(lift.state).to.equal('up')
    })
    it('will go down when first call is from below', () => {
        lift.floor = 5
        lift.calledFrom(1)
        lift.calledFrom(10)
        expect(lift.state).to.equal('down')
    })
    it('ignores call from current floor', () => {
        lift.floor = 5
        lift.calledFrom(5)
        expect(lift.calls).to.deep.equal([])
    })
    it('ignores call from current floor, but dings!', () => {
        let ding
        lift.listener = (floor) => ding = floor
        lift.floor = 5
        lift.calledFrom(5)
        expect(ding).to.equal(5)
    })
    it('moves toward called floor', () => {
        let dings = []
        lift.listener = (floor) => dings.push(floor)
        lift.floor = 5
        lift.calledFrom(6)
        lift.move()
        expect(dings).to.deep.equal([6])
    })
    it('only stops at called floors', () => {
        let dings = []
        lift.listener = (floor) => dings.push(floor)
        lift.floor = 5
        lift.calledFrom(7)
        lift.move()
        lift.move()
        expect(dings).to.deep.equal([7])
    })
    it('can go up then down', () => {
        let dings = []
        lift.listener = (floor) => dings.push(floor)
        lift.floor = 5
        lift.calledFrom(7)
        lift.calledFrom(4)
        lift.move()
        lift.move()
        lift.move()
        lift.move()
        lift.move()

        expect(dings).to.deep.equal([7, 4])
    })
    it('does not go for extra visit', () => {
        let dings = []
        lift.listener = (floor) => dings.push(floor)
        lift.floor = 5
        lift.calledFrom(6)
        lift.calledFrom(7)
        lift.calledFrom(4)
        lift.move()
        lift.move()
        lift.move()
        lift.move()
        lift.move()

        expect(dings).to.deep.equal([6, 7, 4])
    })
    it('can go down then up', () => {
        let dings = []
        lift.listener = (floor) => dings.push(floor)
        lift.floor = 5
        lift.calledFrom(4)
        lift.calledFrom(6)
        lift.move()
        lift.move()
        lift.move()

        expect(dings).to.deep.equal([4, 6])
    })
    it('clears floors, then stops', () => {
        let dings = []
        lift.listener = (floor) => dings.push(floor)
        lift.floor = 5
        lift.calledFrom(4)
        lift.calledFrom(6)
        lift.move()
        lift.move()
        lift.move()

        expect(lift.state).to.equal('waiting')
    })
})

class Lift {
    constructor() {
        this.floor = 0
        this.state = 'waiting'
        this.calls = []
        this.listener = () => { }
    }
    ding() {
        this.listener(this.floor)
    }
    calledFrom(floor) {
        if (floor == this.floor) { return this.ding() }
        this.calls.push(floor)
        if (this.state == 'waiting') {
            if (floor > this.floor) { this.state = 'up' }
            if (floor < this.floor) { this.state = 'down' }
        }
    }
    move() {
        this.floor += this.state == 'up' ? 1 : -1
        this.maybeStop()
    }
    maybeStop() {
        let stop = this.calls.indexOf(this.floor)
        if (stop != -1) {
            this.ding()
            this.calls.splice(stop, 1)
            this.thenWhat()
        }
    }
    thenWhat() {
        let ups = this.calls.filter(c => c > this.floor)
        let downs = this.calls.filter(c => c < this.floor)
        if (ups.length == 0 && downs.length == 0) { this.state = 'waiting' }
        if (ups.length == 0 && downs.length != 0) { this.state = 'down' }
        if (ups.length != 0 && downs.length == 0) { this.state = 'up' }
    }
}