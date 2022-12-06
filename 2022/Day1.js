const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day1', '\n', 'int', false)

const countCalories = input => {
    let calorieCounts = []
    let currentCalories = 0
    for (let i = 0; i < input.length; i++) {
        if (input[i] === 0) {
            calorieCounts.push(currentCalories)
            currentCalories = 0
        } else {
            currentCalories += input[i]
        }
    }
    calorieCounts.sort((a, b) => b - a)
    console.log('most calories:', calorieCounts[0])
    console.log('top 3 calories:', calorieCounts[0] + calorieCounts[1] + calorieCounts[2])
    return calorieCounts
}

countCalories(input)