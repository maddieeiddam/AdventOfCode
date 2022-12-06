const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day3', '\n')

const alphabetArray = Array.from(Array(26))
    .map((e, i) => i + 65)
    .map(x => String.fromCharCode(x).toLowerCase())

const findSharedItem = rucksack => {
    let compA = rucksack.slice(0, rucksack.length / 2)
    let compB = rucksack.slice(rucksack.length / 2)
    for (let i = 0; i < compA.length; i++) {
        if (compB.includes(compA[i])) {
            return compA[i]
        }
    }
}

const findBadge = rucksacks => {
    for (let i = 0; i < rucksacks[0].length; i++) {
        if (rucksacks[1].includes(rucksacks[0][i]) && rucksacks[2].includes(rucksacks[0][i])) {
            return rucksacks[0][i]
        }
    }
}

const prioritize = item => {
    let priority = (item.toLowerCase() === item) ? alphabetArray.indexOf(item) + 1 : alphabetArray.indexOf(item.toLowerCase()) + 27
    return priority
}

const organize = (input, part) => {
    let sum = 0
    for (let i = 0; i < input.length; i++) {
        let sharedItem = (part === 1) ? findSharedItem(input[i]) : findBadge([input[i], input[i + 1], input[i + 2]])
        sum += prioritize(sharedItem)
        if (part === 2) {
            i += 2
        }

    }
    console.log('sum', sum)
    return sum
}

organize(input, 2)

let testInputs = [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
]

helpers.test('rucksack 1 shared item', findSharedItem(testInputs[0]), 'p')
helpers.test('rucksack 2 shared item', findSharedItem(testInputs[1]), 'L')
helpers.test('prioritize p', prioritize('p'), 16)
helpers.test('prioritize L', prioritize('L'), 38)
helpers.test('first group badge', findBadge([testInputs[0], testInputs[1], testInputs[2]]), 'r')

