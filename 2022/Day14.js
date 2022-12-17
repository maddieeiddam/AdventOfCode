const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day14', '\n').map(x => x.split(' -> '))

const buildGrid = input => {
    let grid = {}
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length - 1; j++) {
            let p1 = input[i][j].split(',').map(Number)
            let p2 = input[i][j + 1].split(',').map(Number)
            let points = helpers.pointsBetween(p1[0], p1[1], p2[0], p2[1])
            for (let k = 0; k < points.length; k++) {
                if (grid[points[k][1]]) grid[points[k][1]].add(points[k][0])
                else grid[points[k][1]] = new Set().add(points[k][0])
            }
        }

    }
    let max = Math.max(...Object.keys(grid))
    grid[max + 1] = new Set()
    grid[max + 2] = new Set(Array.from(new Array(3000), (x, i) => i))
    while (max >= 0) {
        if (!grid[max]) {
            grid[max] = new Set()
        }
        max--
    }
    return grid
    
}

const dropSand = (x, y, grid) => {
    if (!grid[y + 1] || grid[y + 1].has(x) && grid[y + 1].has(x - 1) && grid[y + 1].has(x + 1)) {
        grid[y].add(x)
        return grid
    } else {
        while(!grid[y + 1].has(x)) y++

        if (!grid[y + 1].has(x - 1)) return dropSand(x - 1, y + 1, grid)
        if (!grid[y + 1].has(x + 1)) return dropSand(x + 1, y + 1, grid)
        
        return dropSand(x, y, grid)
    }
}

const simulateSand = input => {
    let grid = buildGrid(input)
    let piece = 1
    while (!grid[0].has(500)) {
        grid = dropSand(500, 0, grid)
        piece++
    }
    console.log('final piece', piece - 1)
}

simulateSand(input)