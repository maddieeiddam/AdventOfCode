const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day6', '')

const processBuffer = input => {
    for (let i = 0; i < input.length; i++) {
        let marker = new Set()
        for (let j = 0; j < 14; j++) {
            marker.add(input[i + j])
        }
        if (marker.size === 14) {
            console.log('part 2 solution:', i + 14)
            return i + 14
        }
    }
}

processBuffer(input)