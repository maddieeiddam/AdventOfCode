const helpers = require('../helpers');

// part 1 helper (pass into runModel)
const countOcc = (i, j, arr) => {
  let count = 0;
  for (let k = i - 1; k <= i + 1; k++) {
    for (let m = j - 1; m <= j + 1; m++) {
      if (!(k === i && j === m) && arr[k] && arr[k][m] && arr[k][m] === '#') {
          count++;
      }
    }
  }
  return count;
}

// part 2 helper (pass into runModel)
const countVisible = (i, j, arr) => {
  let count = 0;
  count += findSeat(i,      j + 1,  arr,  0,   1  );
  count += findSeat(i,      j - 1,  arr,  0,   -1 );
  count += findSeat(i + 1,  j,      arr,  1,   0  );
  count += findSeat(i - 1,  j,      arr,  -1,  0  );
  count += findSeat(i - 1,  j - 1,  arr,  -1,  -1 );
  count += findSeat(i - 1,  j + 1,  arr,  -1,  1  );
  count += findSeat(i + 1,  j - 1,  arr,  1,   -1 );
  count += findSeat(i + 1,  j + 1,  arr,  1,    1 );

  return count;
}

const findSeat = (y, x, arr, yop, xop) => {
  let target = (arr[y] && arr[y][x]) ? arr[y][x] : null;
  while (target && target === '.') {
    y = y + yop;
    x = x + xop;
    target = (arr[y] && arr[y][x]) ? arr[y][x] : null;
  }
  let count = (target === '#') ? 1 : 0;
  return count;
}

const nextTickA = (state, lim, helper) => {
  let newState = [];
  for (let i = 0; i < state.length; i++) {
    let newRow = [];
    for (let j = 0; j < state[i].length; j++) {
      if (state[i][j] === 'L' && helper(i, j, state) === 0) {
        newRow.push('#');
      } else if (state[i][j] === '#' && helper(i, j, state) >= lim) {
        newRow.push('L');
      } else {
        newRow.push(state[i][j]);
      }
    }
    newState.push(newRow);
  }
  return newState;
}

const runModel = async (lim, helper) => {
  let input = await (await helpers.fetchInput('Day11')).map(row => row.split(''));
  let currentState = input;

  // part 1 calculation
  while (currentState.join('') !== nextTickA(currentState, lim, helper).join('')) {
    currentState = nextTickA(currentState, lim, helper);
  }
  let occupied = 0;
  for (let i = 0; i < currentState.length; i++) {
    for (let j = 0; j < currentState.length; j++) {
      if (currentState[i][j] === '#') {
        occupied++;
      }
    }
  }
  console.log('occupied seats:', occupied);
}

runModel(4, countOcc);
runModel(5, countVisible);
