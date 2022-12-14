const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day10', '\n').map(x => x.split(' '))

const processSignals = (input, x, cycle) => {
    let sum = 0
    for (let i = 0; i < input.length; i++) {
        if (cycle === 20 || cycle % 40 === 20) sum += cycle * x
        if (input[i][0] === 'noop') cycle += 1
        else if (input[i][0] === 'addx') {
            cycle += 1
            if (cycle === 20 || cycle % 40 === 20) sum += cycle * x
            x += parseInt(input[i][1])
            cycle += 1
        }
    }
    console.log('part 1 solution', sum)
}

processSignals(input, 1, 1)