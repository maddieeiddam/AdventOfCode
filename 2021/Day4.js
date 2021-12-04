const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day4', '\n');

const setupBoards = arr => {
  let chosenNums = arr.shift().split(',').map(Number);
  let boards = [];
  let board = [];
  for (let i = 0; i < arr.length; i++) {
    let row = arr[i].split(' ').filter(el => el.length > 0).map(Number);
    board.push(row);
    if (board.length === 5) {
      boards.push(board);
      board = [];
    }
  }
  return {chosenNums, boards}
}

const winningRow = row => {
  return row.every(val => val === 'X')
}

const winningCol = (board, idx) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i][idx] !== 'X') {
      return false;
    }
  }
  return true;
}

const boardSum = board => {
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== 'X') {
        sum += board[i][j];
      }
    }
  }
  return sum;
}

const part1 = arr => {
  let {chosenNums, boards} = setupBoards(arr)
  for (let i = 0; i < chosenNums.length; i++) {
    for (let j = 0; j < boards.length; j++) {             // each board
      for (let k = 0; k < boards[j].length; k++) {        // each row
        for (let m = 0; m < boards[j][k].length; m++) {   // each element
          if (boards[j][k][m] === chosenNums[i]) {
            boards[j][k][m]  = 'X';
            if (winningRow(boards[j][k]) || winningCol(boards[j], m)) {
              console.log('part 1 solution:', chosenNums[i] * boardSum(boards[j]));
              return boards[j];
            }
          }
        }
      }
    }
  }
}

part1(input)
