const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day3', '\n')

const testInput = ['00100', '11110', '10110', '10111', '10101', '01111', '00111', '11100', '10000', '11001', '00010', '01010']

const countBits = arr => {
  let zerosCount = Array(arr[0].length).fill(0);
  let onesCount = Array(arr[0].length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === '0') {
        zerosCount[j]++;
      } else {
        onesCount[j]++;
      }
    }
  }
  return {zerosCount, onesCount};
}

const part2 = (arr, type, idx, zerosCount, onesCount) => {
  if (arr.length === 1) {
    console.log(`${type} is: ${parseInt(arr[0], 2)}`);
    return parseInt(arr[0], 2);
  } else {
    let mostCommon = (zerosCount[idx] > onesCount[idx]) ? '0' : '1';
    if (type === 'O2 generator rating') {
      // keep numbers that have most common in the given index
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][idx] === mostCommon) {
          newArr.push(arr[i]);
        }
      }
      let newCounts = countBits(newArr);
      return part2(newArr, type, idx + 1, newCounts.zerosCount, newCounts.onesCount);
    } else {
      // keep numbers that do not have most common in the given index
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][idx] !== mostCommon) {
          newArr.push(arr[i])
        }
      }
      let newCounts = countBits(newArr)
      return part2(newArr, type, idx + 1, newCounts.zerosCount, newCounts.onesCount);
    }
  }
}

const part1 = arr => {
  let {zerosCount, onesCount} = countBits(arr);
  let genRating = part2(arr, 'O2 generator rating', 0, zerosCount, onesCount);
  let scrubRating = part2(arr, 'CO2 scrubber rating', 0, zerosCount, onesCount);
  console.log('part 2 solution:', genRating * scrubRating);

  let gamma = '';
  let epsilon = '';
  for (let i = 0; i < zerosCount.length; i++) {
    if (zerosCount[i] > onesCount[i]) {
      gamma = gamma.concat('', '0');
      epsilon = epsilon.concat('', '1');
    } else {
      gamma = gamma.concat('', '1');
      epsilon = epsilon.concat('', '0');
    }
  }
  console.log('part 1 solution:', parseInt(gamma, 2) * parseInt(epsilon, 2));
}

part1(input);
