const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day2', '\n').map(x => x.split(' '))

// rock: A/X
// paper: B/Y
// scissors: C/Z

const RPSKey = {
    A: {beats: 'Z', ties: 'X', loses: 'Y', points: 1},
    B: {beats: 'X', ties: 'Y', loses: 'Z', points: 2},
    C: {beats: 'Y', ties: 'Z', loses: 'X', points: 3},
    X: {beats: 'C', ties: 'A', points: 1, goal: 'lose'},
    Y: {beats: 'A', ties: 'B', points: 2, goal: 'draw'},
    Z: {beats: 'B', ties: 'C', points: 3, goal: 'win'},
}

const matchP1 = (opponent, you) => {
    let score = RPSKey[you].points
    if (RPSKey[you].beats === opponent) {
        score += 6
    } else if (RPSKey[you].ties === opponent) {
        score += 3
    }
    return score
}

const matchP2 = (opponent, you) => {
    switch(RPSKey[you].goal) {
        case 'lose':
            return RPSKey[RPSKey[opponent].beats].points
        case 'draw':
            return RPSKey[opponent].points + 3
        case 'win':
            return RPSKey[RPSKey[opponent].loses].points + 6
    }
}

const decodeStrategy = input => {
    let totalScore = 0
    for (let i = 0; i < input.length; i++) {
        totalScore += matchP2(input[i][0], input[i][1])
    }
    console.log('total score:', totalScore)
}

decodeStrategy(input)