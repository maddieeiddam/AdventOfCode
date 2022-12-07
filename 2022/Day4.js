const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day4', '\n').map(x => x.split(','))

const fullyOverlaps = (s1, s2) => {
    if ((s1[0] <= s2[0] && s1[1] >= s2[1]) || (s2[0] <= s1[0] && s2[1] >= s1[1])) {
        return true
    }
}

const partiallyOverlaps = (s1, s2) => {
    if (s1[1] < s2[0] || s2[1] < s1[0]) {
        return false
    }
    return true
}

const findOverlaps = input => {
    let fullyOverlap = 0
    let partiallyOverlap = 0
    for (let i = 0; i < input.length; i++) {
        let s1 = input[i][0].split('-').map(Number)
        let s2 = input[i][1].split('-').map(Number)
        fullyOverlap = (fullyOverlaps(s1, s2)) ? fullyOverlap + 1 : fullyOverlap
        partiallyOverlap = (partiallyOverlaps(s1, s2)) ? partiallyOverlap + 1 : partiallyOverlap
    }
    console.log('part 1 solution', fullyOverlap)
    console.log('part 2 solution', partiallyOverlap)
}

findOverlaps(input)