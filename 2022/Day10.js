const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day10', '\n').map(x => x.split(' '))

const processSignals = (input, x, cycle) => {
    let sum = 0
    let output = ''

    const checkSprite = () => {
        let sprite = [x - 1, x, x + 1]
        output += sprite.includes((cycle - 1) % 40) ? '█' : ' '
        cycle++
        if ((cycle - 1) % 40 === 0) {
            console.log(output)
            output = ''
        }
    }

    for (let i = 0; i < input.length; i++) {
        if (cycle === 20 || cycle % 40 === 20) sum += cycle * x
        if (input[i][0] === 'noop') checkSprite()
        else if (input[i][0] === 'addx') {
            checkSprite()
            if (cycle === 20 || cycle % 40 === 20) sum += cycle * x
            checkSprite()
            x += parseInt(input[i][1])
        }
    }
    console.log('part 1 solution', sum)
}

processSignals(input, 1, 1)