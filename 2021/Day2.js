const helpers = require('./../helpers');

const testInput = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']
const input = helpers.fetchInput('2021', 'Day2', '\n')

const part1 = arr => {
  const coords = [0, 0]
  arr = helpers.splitArray(arr, ' ')
  for (let i = 0; i < arr.length; i++) {
    let units = parseInt(arr[i][1], 10);
    switch (arr[i][0]) {
      case 'forward':
        coords[0] += units;
        break;
      case 'down':
        coords[1] += units;
        break;
      case 'up':
        coords[1] -= units;
        break;
      default:
        console.log('no match!')
    }
  }
  console.log('solution:', coords[0] * coords[1])
}

const part2 = arr => {

}

part1(input)
