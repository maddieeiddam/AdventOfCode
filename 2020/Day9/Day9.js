const helpers = require('../helpers');

const checkValid = (preamble, num) => {
  for (let i = 0; i < preamble.length - 1; i++) {
    for (let j = 1; j < preamble.length; j++) {
      if (preamble[i] + preamble[j] === num) {
        return true;
      }
    }
  }
  return false;
}

const findContigSet = (input, num) => {
  for (let i = 0; i < input.length - 2; i++) {
    for (let j = 2; j < input.length; j++) {
      let arr = input.slice(i, j + 1);
      let rangeSum = arr.reduce((x, y) => x + y, 0);
      if (rangeSum === num) {
        let min = Math.min(...arr);
        let max = Math.max(...arr);
        console.log('encryption weakness:', min + max);
        return min + max;
      }
    }
  }
}

const findInvalidNum = async () => {
  let input = (await helpers.fetchInput('Day9')).map(num => parseInt(num));
  let preamble = input.slice(0, 25);
  let list = input.slice(25, input.length);
  for (let i = 0; i < list.length; i++) {
    if (checkValid(preamble, list[i])) {
      preamble.shift();
      preamble.push(list[i]);
    } else {
      console.log('invalid number:', list[i]);
      findContigSet(input, list[i]);
      return list[i];
    }
  }
}

findInvalidNum();
