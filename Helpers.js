const fs = require('fs-extra');
const path = require('path');

function fetchInput(yrStr, dayStr, splitOn = '\n', type = 'str') {
  let input;
  if (parseInt(yrStr, 10) < 2021) {
    input = fs.readFileSync(path.join(__dirname, yrStr, dayStr, 'input.txt'), 'utf8')
  } else {
    input = fs.readFileSync(path.join(__dirname, yrStr, 'inputs', `${dayStr}.txt`), 'utf8')
  }
  let inputArr = input.split(splitOn).filter(el => el.length > 0)
  if (type === 'int') {
    inputArr = inputArr.map(Number)
  }
  return inputArr;
}

function splitArray(arr, char) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].split(char));
  }
  return newArr;
}

function arrToString(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].join(''));
  }
  return newArr;
}

// returns the size of an input array as [width, height]
function getGridSize(arr) {
  let size = [
		arr[0].length,
		arr.length,
	];
  return size
}

//
function getAdjacent(arr, x, y) {
  const [X, Y] = getGridSize(arr);
  return [
		[x + 1, y],
		[x, y + 1],
		[x - 1, y],
		[x, y - 1],
	]
	.filter(([x, y]) => x >= 0 && x < X && y >= 0 && y < Y)
}

module.exports = {
  fetchInput,
  splitArray,
  arrToString,
  getAdjacent
}
