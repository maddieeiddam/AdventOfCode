const helpers = require('../helpers');

const checkSlope = async (right, down) => {
  let input = await helpers.fetchInput('Day3');

  let width = right * (input.length - 1);
  for (let row = 0; row < input.length; row++) {
    while (input[row].length < width) {
      input[row] = input[row].concat(input[row]);
    }
  }

  let xCoord = 0;
  let treeCount = 0;

  let grid = helpers.splitArray(input, '');
  for (let y = 0; y < grid.length; y += down) {
    if (grid[y][xCoord] === '#') {
      treeCount++;
    }
    xCoord += right;
  }
  console.log(treeCount);
  return treeCount;
}

checkSlope(1, 1);
checkSlope(3, 1);
checkSlope(5, 1);
checkSlope(7, 1);
checkSlope(1, 2);
