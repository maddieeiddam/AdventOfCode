const helpers = require('./../helpers');

const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
const input = helpers.fetchInput('2021', 'Day1', '\n', 'int')

const part1 = arr => {
  let increaseCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1]) {
      increaseCount++;
    }
  }
  console.log('solution:', increaseCount);
  return increaseCount;
}

const part2 = arr => {
  let sumArr = [];
  for (let i = 0; i < arr.length - 2; i++) {
    sumArr.push(arr[i] + arr[i + 1] + arr[i + 2])
  }
  return part1(sumArr)
}

part1(input)
part2(input)
