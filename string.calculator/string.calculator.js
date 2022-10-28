export const Calculator = function () {
    this.operations = [
        {
            sign: '*',
            execute: (a, b) => a * b
        },
        {
            sign: '+',
            execute: (a, b) => a + b
        }
    ]
};

Calculator.prototype.calculate = function (input, variables) {
    variables = variables || {}
    variables[input] !== undefined ? input = variables[input].toString() : input
    let value = parseFloat(input)
    if (input.indexOf(')') != -1) {
        let before = input.substring(0, input.indexOf(')'))
        let inside = before.substring(1 + before.lastIndexOf('('))
        let result = this.calculate(inside, variables)
        let reduced = before.substring(0, before.lastIndexOf('('))
            + result
            + input.substring(1 + input.indexOf(')'))
        return this.calculate(reduced, variables)
    }
    this.operations.forEach((operation) => {
        let position = input.indexOf(operation.sign)
        if (position != -1) {
            let left = input.substring(0, position)
            let right = input.substring(1 + position)
            value = operation.execute(
                this.calculate(left, variables),
                this.calculate(right, variables)
            )
        }
    })

    return parseFloat(value.toFixed(5))
};
