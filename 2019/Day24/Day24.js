const fs = require('fs-extra');
const path = require('path');

const findNeighbors = (arr, row, col) => {
  let neighborSum = 0;
  function bugCheck(x, y) {
    if (arr[x][y] === '#') {
      neighborSum++;
    }
  }
  if (row > 0) {
    bugCheck(row - 1, col);
  }
  if (row < 4) {
    bugCheck(row + 1, col);
  }
  if (col > 0) {
    bugCheck(row, col - 1);
  }
  if (col < 4) {
    bugCheck(row, col + 1);
  }
  return neighborSum;
}

const generateLayout = arr => {
  let newArr = [];
  for (let row = 0; row < arr.length; row++) {
    let newRow = [];
    for (let col = 0; col < arr[row].length; col++) {
      let neighborSum = findNeighbors(arr, row, col);
      if (arr[row][col] === '#') {
        if (neighborSum === 1) {
          newRow.push('#');
        } else {
          newRow.push('.');
        }
      } else if (arr[row][col] === '.') {
        if (neighborSum === 1 || neighborSum === 2) {
          newRow.push('#');
        } else {
          newRow.push('.');
        }
      }
    }
    newArr.push(newRow);
  }
  return newArr;
}

const getBiodiversity = arr => {
  let score = 0;
  let points = 1
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[row].length; col++) {
      if (arr[row][col] === '#') {
        score = score + points;
      }
      points = points * 2;
    }
  }
  return score;
}

const getInputArray = async () => {
  let input = await (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
  let inputArray = [];

  for (let i = 0; i < input.length - 1; i++) {
    let line = input[i].split('');
    inputArray.push(line);
  }

  let bioScores = [];
  let repeat = false;
  let nextArray = inputArray;

  while (!repeat) {
    nextArray = generateLayout(nextArray);
    let bioScore = getBiodiversity(nextArray);
    if (bioScores.includes(bioScore)) {
      repeat = true;
      console.log('first repeat is', bioScore);
    } else {
      bioScores.push(bioScore);
    }
  }

};

getInputArray();
