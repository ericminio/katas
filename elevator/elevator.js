var Elevator = function(options) {
    this.floor = 0
    this.state = 'waiting'
    this.goingupcalls = []
    this.goingdowncalls = []
    this.ding = ()=>{}
}
Elevator.prototype.calledFrom = function(floor) {
    if (floor == this.floor) {
        this.ding(this.floor)
        return
    }
    this.request(floor)
}
Elevator.prototype.request = function(floor) {
    if (floor > this.floor) {
        if (this.state == 'waiting') { this.state = 'up' }
        this.goingupcalls.push(floor)
    }
    else if (floor < this.floor) {
        if (this.state == 'waiting') { this.state = 'down' }
        this.goingdowncalls.push(floor)
    }
}
Elevator.prototype.move = function() {
    if (this.state == 'waiting') { return }

    this.floor += this.state == 'up' ? 1 : -1

    let calls = this.state == 'down' ? this.goingdowncalls : this.goingupcalls
    let call = calls.indexOf(this.floor)
    if (call != -1) {
        calls.splice(call, 1)
        this.ding(this.floor)
    }

    if (this.goingdowncalls.length == 0 && this.goingupcalls.length == 0) {
        this.state = 'waiting'
    }
    if (this.goingdowncalls.length == 0 && this.goingupcalls.length != 0) {
        this.state = 'up'
    }
    if (this.goingdowncalls.length != 0 && this.goingupcalls.length == 0) {
        this.state = 'down'
    }
}

module.exports = {
    Elevator
}
