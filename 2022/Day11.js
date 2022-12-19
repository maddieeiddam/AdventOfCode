const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day11', '\n\n').map(x => {
    let arr = x.split('\n').map(x => x.split(': '))
    return {
        items: arr[1][1].split(' ').map(x => Number(x.split(',')[0])),
        op: arr[2][1].split('= ')[1].split(' '),
        test: Number(arr[3][1].split(' ')[2]),
        true: arr[4][1].split(' ')[3],
        false: arr[5][1].split(' ')[3],
        inspections: 0
    }
})

const changeWorry = (lvl, op, mod) => {
    let num = op[2] === 'old' ? lvl : Number(op[2])
    lvl = op[1] === '+' ? lvl + num : lvl * num
    // lvl = Math.floor(lvl / 3)
    lvl = lvl % mod
    return lvl
}

const monkeyBusiness = (input, times) => {
    let mod = input.reduce((a, b) => a * b.test, 1)
    while (times > 0) {
        for (let i = 0; i < input.length; i++) {
            let monkey = input[i]
            while (monkey.items.length > 0) {
                let item = monkey.items.shift()
                let newLvl = changeWorry(item, monkey.op, mod)
                monkey.inspections++
                let next = newLvl % monkey.test === 0 ? monkey.true : monkey.false
                input[next].items.push(newLvl)
            }
        }
        times--
    }
    input.sort((a, b) => b.inspections - a.inspections)
    console.log('solution:', input[0].inspections * input[1].inspections)
}

monkeyBusiness(input, 10000)
