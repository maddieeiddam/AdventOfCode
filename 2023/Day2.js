const helpers = require('./../helpers')
const input = helpers.fetchInput('2023', 'Day2', '\n', 'str', true)

const checkGames = input => {
    const cubeSet = {'red': 12, 'green': 13, 'blue': 14}
    let possibleSum = 0
    let powerSum = 0
    input.map((game) => {
        [id, sets] = game.split(': ')
        id = parseInt(id.split(' ')[1])
        let possible = true
        let min = {}
        sets = sets.split('; ').map((set) => {
            set = set.split(', ').map((x) => x = x.split(' '))
            for (let i = 0; i < set.length; i++) {
                [count, color] = set[i]
                count = parseInt(count)
                if (cubeSet[color] < count) possible = false
                if (!min[color] || min[color] < count) min[color] = count
            }
        })
        powerSum += Object.values(min).reduce((a, b) => a * b)
        if (possible) possibleSum += id
    })
    console.log('part 1:', possibleSum)
    console.log('part 2:', powerSum)
}

checkGames(input)