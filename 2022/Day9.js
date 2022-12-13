const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day9', '\n').map(x => x.split(' '))

const stepHead = (coord, dir) => {
    let target = (dir === 'U' || dir === 'D') ? 'y' : 'x'
    coord[target] = (dir === 'D' || dir === 'L') ? coord[target] - 1 : coord[target] + 1
    return coord
}

const tVisitedPart1 = new Set()
const tVisitedPart2 = new Set()
tVisitedPart1.add('0,0')
tVisitedPart2.add('0,0')

const stepTail = (idx, head, tail) => {
    let newTail = tail
    if (helpers.isAdjacent(head.x, head.y, tail.x, tail.y)) {
        return tail
    } else if (Math.abs(head.x - tail.x) === 2 && Math.abs(head.y - tail.y) === 0) {
        newTail.x = (head.x + tail.x) / 2
    } else if (Math.abs(head.y - tail.y) === 2 && Math.abs(head.x - tail.x) === 0) {
        newTail.y = (head.y + tail.y) / 2
    } else {
        if (head.x > tail.x) {
            newTail.x += 1
            if (head.y > tail.y) {
                newTail.y += 1
            } else {
                newTail.y -= 1
            }
        } else {
            newTail.x -= 1
            if (head.y > tail.y) {
                newTail.y += 1
            } else {
                newTail.y -= 1
            }
        }
    }
    idx === 0 ? tVisitedPart1.add(`${tail.x},${tail.y}`) : null
    idx === 8 ? tVisitedPart2.add(`${tail.x},${tail.y}`) : null
    return newTail
}

const mapTail = input => {
    let hCoord = {x: 0, y: 0}
    let tails = Array.from(Array(9)).map(e => ({x: 0, y: 0}))
    console.log('tails', tails)
    for (let i = 0; i < input.length; i++) {
        let distance = Number(input[i][1])
        while (distance > 0) {
            hCoord = stepHead(hCoord, input[i][0])
            tails[0] = stepTail(0, hCoord, tails[0])
            for (let j = 1; j < tails.length; j++) {
                tails[j] = stepTail(j, tails[j - 1], tails[j])
            }
            distance--
        }
    }
    console.log('part 1 solution:', tVisitedPart1.size)
    console.log('part 2 solution:', tVisitedPart2.size)
}

mapTail(input)

