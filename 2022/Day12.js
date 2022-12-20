const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day12', '\n').map(row => row.split(''))

const getValidMoves = (input, point) => {
    let adj = helpers.getAdjacent(input, 1, point[0], point[1])
    // return adj.filter(([x, y]) => input[x][y].charCodeAt(0) - input[point[0]][point[1]].charCodeAt(0) <= 1)
    return adj.filter(([x, y]) => input[point[0]][point[1]].charCodeAt(0) - input[x][y].charCodeAt(0) <= 1)
}

const navigate = input => {
    let row = input.findIndex(row => row.includes('S'))
    let start = [row, input[row].indexOf('S')]
    input[start[0]][start[1]] = 'a'

    row = input.findIndex(row => row.includes('E'))
    let target = [row, input[row].indexOf('E')]
    input[target[0]][target[1]] = 'z'
    console.log('target', target)

    console.log('part 1 solution:', helpers.breadthFirstSearch(input, start, target, getValidMoves))
    // console.log('part 2 solution', helpers.breadthFirstSearch(input, target, start, getValidMoves))
}

navigate(input)