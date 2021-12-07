const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day7', ',', 'int');

const testInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const part1 = arr => {
  let sorted = arr.sort((a, b) => a - b);
  let median = sorted[Math.floor(sorted.length / 2)];
  let fuel = 0;
  for (let i = 0; i < arr.length; i++) {
    fuel += Math.abs(arr[i] - median)
  }
  console.log('part 1 solution:', fuel);
}

const part2 = arr => {
  let average = Math.floor((arr.reduce((a, b) => a + b)) / arr.length)
  let fuel = 0;
  for (let i = 0; i < arr.length; i++) {
    let d = Math.abs(arr[i] - average);
    fuel += (d * d + d) / 2
  }
  console.log('part 2 solution', fuel);
}

part1(input);
part2(input);
