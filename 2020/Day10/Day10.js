const helpers = require('../helpers');

// part 2 helper function
const findCombos = (arr, memo) => {
  let key = arr.join('');
  if (key in memo) {
    return memo[key];
  }
  let options = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i + 1] - arr[i - 1] <= 3) {
      let newArr = [arr[i - 1]].concat(arr.slice(i + 1));
      options += findCombos(newArr, memo);
    }
  }
  memo[key] = options;
  return options;
}

// part 1 solution
const joltAdapter = async () => {
  let input = await (await helpers.fetchInput('Day10')).map(str => parseInt(str));
  input = input.sort((a, b) => a - b);
  input.unshift(0);
  input.push(input[input.length - 1] + 3);

  let diffs = [];
  for (let i = 1; i < input.length; i++) {
    diffs.push(input[i] - input[i - 1]);
  }
  console.log('1 diff total:', diffs.filter(x => x === 1).length);
  console.log('3 diff total:', diffs.filter(x => x === 3).length);

  let pathTotal = findCombos(input, {});
  console.log('part 2 solution:', pathTotal);
}

joltAdapter();

