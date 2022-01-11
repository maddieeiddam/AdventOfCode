const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day9', '\n');

const testInput = ['2199943210', '3987894921', '9856789892', '8767896789', '9899965678'];

const isLowPoint = (arr, i, j) => {
  let adjacents = helpers.getAdjacent(arr, i, j)
  let basin = true
  adjacents.forEach(adj => {
    if (arr[i][j] >= arr[adj[0]][adj[1]]) {
      basin = false
    }
  })
  return basin
}

const getBasin = (arr, i, j, acc) => {
  helpers.getAdjacent(arr, i, j).forEach(adj => {
    let newPoints = []
    if (arr[adj[0]][adj[1]] !== '9') {
      let adjStr = adj[0] + '-' + adj[1]
      if (!acc[adjStr]) {
        newPoints.push([adj[0], adj[1]])
        acc[adj[0] + '-' + adj[1]] = true
      }
    }
    if (newPoints.length === 0) {
      return acc
    } else {
      newPoints.forEach(pt => {
        return getBasin(arr, pt[0], pt[1], acc)
      })
    }
  })
  return acc
}

const findLargestBasins = (arr, lows) => {
  let basinSizes = []
  lows.forEach(low => {
    let basinObj = {[low]: true}
    let [i, j] = low.split('-').map(Number)
    let basin = getBasin(arr, i, j, basinObj, 1)

    basinSizes.push(Object.keys(basin).length)
  })
  basinSizes.sort((a, b) => b - a)
  console.log('part 2 solution:', basinSizes[0] * basinSizes[1] * basinSizes[2])
}

const getLowPoints = arr => {
  let riskLevel = 0;
  let lowPoints = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (isLowPoint(arr, i, j)) {
        riskLevel += parseInt(arr[i][j], 10) + 1;
        lowPoints.push(i + '-' + j);
      }
    }
  }
  console.log('part 1 solution:', riskLevel);
  findLargestBasins(arr, lowPoints)
}

getLowPoints(input)
