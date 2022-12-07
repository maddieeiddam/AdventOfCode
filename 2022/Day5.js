const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day5', '\n\n')

const buildStacks = diagram => {
    let stacks = diagram[diagram.length - 1].split('   ').reduce((a, v) => ({...a, [Number(v)]: []}), {})
    for (let i = diagram.length - 2; i >= 0; i--) {
        for (let j = 0; j < diagram[i].length; j++) {
            let box = diagram[i].slice(j, j + 3)
            if (box.includes('[')) {
                stacks[(j / 4 + 1)].push(box)
            }
            j += 3
        }
    }
    return stacks
}

const rearrange = (input, part) => {
    let stacks = buildStacks(input[0].split('\n'))
    let steps = input[1].split('\n')
    for (let i = 0; i < steps.length; i++) {
        let instr = steps[i].split(' ').map(Number).filter(x => !Number.isNaN(x))

        if (part === 1) {
            while (instr[0] > 0) {
                stacks[instr[2]].push(stacks[instr[1]].pop())
                instr[0]--
            }
        } else {
            stacks[instr[2]] = stacks[instr[2]].concat(stacks[instr[1]].splice(stacks[instr[1]].length - instr[0], stacks[instr[1]].length)) 
        }
    }
    let solution = []
    for (const stack in stacks) {
        solution.push(stacks[stack].pop().split('')[1])
    }
    console.log('solution', solution.join(''))
}

rearrange(input, 2)
