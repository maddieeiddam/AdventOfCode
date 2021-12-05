const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day3', '\n')

const getMostCommonBit = (arr, idx) => {
  let zeroCount = 0;
  let oneCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][idx] === '0') {
      zeroCount++;
    } else {
      oneCount++;
    }
  }
  return (zeroCount > oneCount) ? '0' : '1';
}

const part2 = (arr, type, idx, mostBit) => {
  if (arr.length === 1) {
    return parseInt(arr[0], 2);
  } else {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (type === 'O2' && arr[i][idx] === mostBit) {
        newArr.push(arr[i]);
      } else if (type === 'CO2' && arr[i][idx] !== mostBit) {
        newArr.push(arr[i])
      }
    }
    let newMost = getMostCommonBit(newArr, idx + 1);
    return part2(newArr, type, idx + 1, newMost);
  }
}

const part1 = arr => {
  let mostBit = getMostCommonBit(arr, 0);
  let genRating = part2(arr, 'O2', 0, mostBit);
  let scrubRating = part2(arr, 'CO2', 0, mostBit);
  console.log('part 2 solution:', genRating * scrubRating);

  let gamma = '';
  let epsilon = '';
  for (let i = 0; i < arr[0].length; i++) {
    mostBit = getMostCommonBit(arr, i);
    gamma = gamma.concat('', mostBit);
    epsilon = epsilon.concat('', (mostBit === '0') ? '1' : '0');
  }
  console.log('part 1 solution:', parseInt(gamma, 2) * parseInt(epsilon, 2));
}

part1(input);
