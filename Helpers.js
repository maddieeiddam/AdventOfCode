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
function getGridSize(arr, repeat = 1) {
  let size = [
		arr[0].length * repeat,
		arr.length * repeat,
	];
  return size
}

// returns an array of all adjacent coordinates of a specific x,y in a 2D array
function getAdjacent(arr, repeat, x, y, diag = false) {
  const [W, H] = getGridSize(arr, repeat);
  let adj = [
		[x + 1, y],
		[x, y + 1],
		[x - 1, y],
		[x, y - 1],
	]
  if (diag) {
    adj.push([x - 1, y + 1], [x - 1, y - 1], [x + 1, y + 1], [x + 1, y - 1])
  }
	return adj.filter(([x, y]) => x >= 0 && x < H && y >= 0 && y < W)
}

// returns an array of ints [x, y] given the string 'x,y'
function parseCoord(coord) {
  return coord.split(',').map(n => parseInt(n, 10));
}

module.exports = {
  fetchInput,
  splitArray,
  arrToString,
  getGridSize,
  getAdjacent,
  parseCoord
}
