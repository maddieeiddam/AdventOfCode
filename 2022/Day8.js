const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day8', '\n').map(row => row.split('').map(Number))

const isVisible = (target, otherTrees) => {
    let visible = true
    for (let i = 0; i < otherTrees.length; i++) {
        if (otherTrees[i] >= target) visible = false
    }
    return visible
}

const treeScore = (target, otherTrees) => {
    let score = 0
    for (let i = 0; i < otherTrees.length; i++) {
        if (otherTrees[i] >= target) {
            score++
            return score
        } else {
            score++
        }
    }
    return score
}

const countVisibleTrees = input => {
    let count = 0
    let maxScore = 0
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (i === 0 || i === input[i].length - 1 || j === 0 || j === input[i][j].length - 1) {
                count++
            } else {
                let visibleLeft = isVisible(input[i][j], input[i].slice(0, j))
                let visibleRight = isVisible(input[i][j], input[i].slice(j + 1))

                let column = input.map((val, idx) => val[j])
                let visibleTop = isVisible(input[i][j], column.slice(0, i))
                let visibleBottom = isVisible(input[i][j], column.slice(i + 1))
                if (visibleLeft || visibleRight || visibleTop || visibleBottom) count++

                let score = treeScore(input[i][j], input[i].slice(0, j).reverse()) * treeScore(input[i][j], input[i].slice(j + 1)) * treeScore(input[i][j], column.slice(0, i).reverse()) * treeScore(input[i][j], column.slice(i + 1))
                maxScore = score > maxScore ? score : maxScore
            }
        }
    }
    console.log('part 1 solution:', count)
    console.log('part 2 solution:', maxScore)
}

countVisibleTrees(input)

