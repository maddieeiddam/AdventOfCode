const helpers = require('./../helpers');

const testInput = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2']
const input = helpers.fetchInput('2021', 'Day2', '\n')

const navigate = (arr, part) => {
  arr = helpers.splitArray(arr, ' ')
  const coords = {
    x: 0,
    y: 0,
    aim: 0
  }
  for (let i = 0; i < arr.length; i++) {
    let units = parseInt(arr[i][1], 10);
    if (part === 1) {
      if (arr[i][0] === 'forward') {
        coords.x += units;
      } else if (arr[i][0] === 'down') {
        coords.y += units
      } else {
        coords.y -= units
      }
    } else if (part === 2) {
        if (arr[i][0] === 'forward') {
          coords.x += units;
          coords.y += coords.aim * units
        } else if (arr[i][0] === 'down') {
          coords.aim += units
        } else {
          coords.aim -= units
        }
    }
  }
  console.log('solution:', coords.x * coords.y)
}

navigate(input, 2)
