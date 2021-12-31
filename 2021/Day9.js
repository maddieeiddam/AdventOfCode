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

const part1 = arr => {
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
  return lowPoints;
}

part1(input)
