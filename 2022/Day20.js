const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day20', '\n').map(Number)

const mixFile = input => {
    let queue = input
    console.log('input', input)
    for (let i = 0; i < queue; i++) {
        console.log(input)
        console.log('moving', input[i])
    }
}

mixFile(input)