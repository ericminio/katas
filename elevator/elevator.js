export class Elevator {
    constructor() {
        this.floor = 0
        this.state = 'waiting'
        this.ups = []
        this.downs = []
        this.listener = () => { }
    }
    ding() {
        this.listener(this.floor)
    }
    calledFrom(floor) {
        this.request(floor)
    }
    request(floor) {
        if (floor > this.floor) {
            this.ups.push(floor)
            if (this.state == 'waiting') { this.state = 'up' }
        }
        else if (floor < this.floor) {
            this.downs.push(floor)
            if (this.state == 'waiting') { this.state = 'down' }
        }
        else {
            this.ding()
        }
    }
    move() {
        if (this.state == 'waiting') { return }

        this.floor += this.state == 'up' ? 1 : -1
        this.maybeOpen()
        this.thenWhat()
    }
    maybeOpen() {
        let calls = this.state == 'up' ? this.ups : this.downs
        let index = calls.indexOf(this.floor)
        if (index != -1) {
            this.ding()
            calls.splice(index, 1)
        }
    }
    thenWhat() {
        if (this.downs.length == 0 && this.ups.length == 0) {
            this.state = 'waiting'
        }
        if (this.downs.length == 0 && this.ups.length != 0) {
            this.state = 'up'
        }
        if (this.downs.length != 0 && this.ups.length == 0) {
            this.state = 'down'
        }
    }
};
