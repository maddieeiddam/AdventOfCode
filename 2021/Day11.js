const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day11', '\n').map(row => row.split('').map(x => ({val: parseInt(x, 10), flashed: false })));

let testInput = ['5483143223', '2745854711', '5264556173', '6141336146', '6357385478', '4167524645', '2176841721', '6882881134', '4846848554', '5283751526']
testInput = testInput.map(row => row.split('').map(x => ({val: parseInt(x, 10), flashed: false })))

const flashesLeft = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j].val > 9 && !arr[i][j].flashed) {
        return true
      }
    }
  }
  return false
}

// eslint-disable-next-line complexity
const step = arr => {
  let flashes = 0
  // first, the energy of all octopi increases by 1
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j].val++
    }
  }
  // then, any octopus with an energy level greater than 9 flashes
  let doneFlashing = false
  while (!doneFlashing) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j].val > 9 && !arr[i][j].flashed) {
          flashes++
          arr[i][j].flashed = true
          // this increases the energy of the 8 adj octopi by 1 which may cause them to flash
          let neighbors = helpers.getAdjacent(arr, i, j, true)
          neighbors.forEach(coord => {
            let pt = arr[coord[0]][coord[1]]
            pt.val++
          })
        }
      }
    }
    doneFlashing = !flashesLeft(arr)
  }
  // finally, any octopus that flashed during this step has its energy level set to 0
  // all octopuses have flashed set back to false for the next step
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j].flashed) {
        arr[i][j].val = 0
      }
      arr[i][j].flashed = false
    }
  }
  return flashes
}

const part1 = (arr, times) => {
  let count = 0
  while (times > 0) {
    count += step(arr)
    times--
  }
  console.log('total flashes:', count)
}

const part2 = (arr) => {
  let allFlashed = false
  let steps = 0
  while (!allFlashed) {
    let num = step(arr)
    steps++
    if (num === 100) {
      console.log('all flashed simultaneously on step', steps)
      allFlashed = true
    }
  }
}

part1(input, 100)
part2(input)
