let { expect } = require('chai')
let { Elevator } = require('./elevator')

describe('elevator', ()=>{

    let elevator
    beforeEach(()=>{
        elevator = new Elevator()
    })
    it('starts on the ground', ()=>{
        expect(elevator.floor).to.equal(0)
    })
    it('starts by waiting', ()=>{
        expect(elevator.state).to.equal('waiting')
    })
    it('records calls', ()=>{
        elevator.calledFrom(2)
        elevator.calledFrom(4)

        expect(elevator.goingupcalls).to.deep.equal([2, 4])
    })
    it('distinguishes direction', ()=>{
        elevator.floor = 4
        elevator.calledFrom(10)
        elevator.calledFrom(8)
        elevator.calledFrom(1)
        elevator.calledFrom(0)

        expect(elevator.goingupcalls).to.deep.equal([10, 8])
        expect(elevator.goingdowncalls).to.deep.equal([1, 0])
    })
    it('will go up when first call is above current', ()=>{
        elevator.floor = 4
        elevator.calledFrom(10)
        elevator.calledFrom(1)

        expect(elevator.state).to.equal('up')
    })
    it('will go down when first call is below current', ()=>{
        elevator.floor = 4
        elevator.calledFrom(1)
        elevator.calledFrom(10)

        expect(elevator.state).to.equal('down')
    })
    it('can move up', ()=>{
        elevator.floor = 4
        elevator.calledFrom(6)
        elevator.move()

        expect(elevator.floor).to.equal(5)
    })
    it('can move down', ()=>{
        elevator.floor = 4
        elevator.calledFrom(0)
        elevator.move()

        expect(elevator.floor).to.equal(3)
    })
    it('moves until waiting', ()=>{
        elevator.floor = 4
        elevator.calledFrom(2)

        elevator.move()
        expect(elevator.floor).to.equal(3)
        expect(elevator.goingdowncalls).to.deep.equal([2])
        expect(elevator.state).to.equal('down')
        elevator.move()
        expect(elevator.floor).to.equal(2)
        expect(elevator.goingdowncalls).to.deep.equal([])
        expect(elevator.state).to.equal('waiting')

        elevator.move()
        expect(elevator.floor).to.equal(2)
        expect(elevator.goingdowncalls).to.deep.equal([])
        expect(elevator.state).to.equal('waiting')
    })
    it('clears both directions', ()=>{
        elevator.floor = 4
        elevator.calledFrom(2)
        elevator.calledFrom(5)

        elevator.move()
        expect(elevator.floor).to.equal(3)
        expect(elevator.goingdowncalls).to.deep.equal([2])
        expect(elevator.goingupcalls).to.deep.equal([5])
        expect(elevator.state).to.equal('down')
        elevator.move()
        expect(elevator.floor).to.equal(2)
        expect(elevator.goingdowncalls).to.deep.equal([])
        expect(elevator.goingupcalls).to.deep.equal([5])
        expect(elevator.state).to.equal('up')
        elevator.move()
        expect(elevator.floor).to.equal(3)
        expect(elevator.goingdowncalls).to.deep.equal([])
        expect(elevator.goingupcalls).to.deep.equal([5])
        expect(elevator.state).to.equal('up')
        elevator.move()
        expect(elevator.floor).to.equal(4)
        expect(elevator.goingdowncalls).to.deep.equal([])
        expect(elevator.goingupcalls).to.deep.equal([5])
        expect(elevator.state).to.equal('up')
        elevator.move()
        expect(elevator.floor).to.equal(5)
        expect(elevator.goingdowncalls).to.deep.equal([])
        expect(elevator.goingupcalls).to.deep.equal([])
        expect(elevator.state).to.equal('waiting')
    })
    it('ignores calls from current floor', ()=>{
        elevator.calledFrom(0)
        expect(elevator.goingdowncalls).to.deep.equal([])
        expect(elevator.goingupcalls).to.deep.equal([])

        elevator.move()
        expect(elevator.floor).to.equal(0)
    })
    it('dings', ()=>{
        let dings = []
        elevator.ding = (floor)=>{
            dings.push(floor)
        }
        elevator.calledFrom(2)
        elevator.move()
        elevator.move()
        expect(dings).to.deep.equal([2])
    })
    it('dings immediatly when already there', ()=>{
        let dings = []
        elevator.ding = (floor)=>{
            dings.push(floor)
        }
        elevator.calledFrom(0)
        expect(dings).to.deep.equal([0])
    })
    it('accept floor request', ()=>{
        let dings = []
        elevator.ding = (floor)=>{
            dings.push(floor)
        }
        elevator.calledFrom(1)
        elevator.move()
        elevator.request(2)
        elevator.move()

        expect(elevator.floor).to.equal(2)
        expect(dings).to.deep.equal([1, 2])
    })
    it('accept interupting floor request', ()=>{
        let dings = []
        elevator.ding = (floor)=>{
            dings.push(floor)
        }
        elevator.calledFrom(4)
        elevator.move()
        elevator.calledFrom(2)
        elevator.move()
        elevator.request(3)
        elevator.move()
        elevator.move()

        expect(elevator.floor).to.equal(4)
        expect(dings).to.deep.equal([2, 3, 4])
    })
    it('postpone too-late floor request', ()=>{
        let dings = []
        elevator.ding = (floor)=>{
            dings.push(floor)
        }
        elevator.calledFrom(4)
        elevator.move()
        elevator.calledFrom(2)
        elevator.move()
        elevator.request(1)
        elevator.move()
        elevator.move()
        expect(elevator.floor).to.equal(4)
        elevator.move()
        elevator.move()
        elevator.move()
        expect(elevator.floor).to.equal(1)
        expect(dings).to.deep.equal([2, 4, 1])
    })
    it('ignores floor request to current floor', ()=>{
        elevator.request(0)
        expect(elevator.goingdowncalls).to.deep.equal([])
        expect(elevator.goingupcalls).to.deep.equal([])

        elevator.move()
        expect(elevator.floor).to.equal(0)
    })
})
