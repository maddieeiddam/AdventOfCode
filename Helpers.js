const fs = require('fs-extra');
const path = require('path');
const { dequal } = require('dequal');

function fetchInput(yrStr, dayStr, splitOn = '\n', type = 'str', filterEmpty = true) {
  let input;
  if (parseInt(yrStr, 10) < 2021) {
    input = fs.readFileSync(path.join(__dirname, yrStr, dayStr, 'input.txt'), 'utf8')
  } else {
    input = fs.readFileSync(path.join(__dirname, yrStr, 'inputs', `${dayStr}.txt`), 'utf8')
  }
  let inputArr = input.split(splitOn)
  inputArr = filterEmpty ? inputArr.filter(el => el.length > 0) : inputArr
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

// given coords of 2 points, returns true if the points are adjacent, diagonal, overlapping
function isAdjacent(x1, y1, x2, y2, diagonal=true) {
  const dx = Math.abs(x1 - x2)
  const dy = Math.abs(y1 - y2)
  if (diagonal) {
    return (dx + dy === 1 || dx + dy === 0 || (dx === 1 && dy === 1))
  } else return (dx + dy === 1 || dx + dy === 0)
}

// returns an array of ints [x, y] given the string 'x,y'
function parseCoord(coord) {
  return coord.split(',').map(n => parseInt(n, 10));
}

// converts an input to an output given a conversion dictionary
function convertWithDict(x, dict) {
  return dict.hasOwnProperty(x) ? dict[x] : console.log('error: conversion dictionary does not include ', x)
}

// converts each char of a string given a conversion dictionary
function convertStringWithDict(str, dict) {
  return str.split('').map(char => convertWithDict(char, dict)).join('')
}

// given 2 horizontal/vertical points, returns an array of all points between (inclusive)
function pointsBetween(x1, y1, x2, y2) {
  let output = []
  if (x1 === x2) {
    let y = Math.max(y1, y2)
    while (y >= Math.min(y1, y2)) {
      output.push([x1, y])
      y--
    }
    return output
  } else if (y1 === y2) {
    let x = Math.max(x1, x2)
    while (x >= Math.min(x1, x2)) {
      output.push([x, y1])
      x--
    }
    return output
  } else {
    console.log(`error: ${x1},${y1} is not horizontal or vertical to ${x2},${y2}`)
  }
}

// given a starting point and target point in the form [x, y]
// and a callback to determine valid paths, returns the shortest path between
function breadthFirstSearch(input, start, target, nextFn) {
  let queue = [[start, 0]]
  let visited = new Set()
  while (queue.length) {
      const [current, steps] = queue.shift()
      if (visited.has(current.toString())) {
          continue
      }
      visited.add(current.toString())
      console.log('current', current, input[current[0]][current[1]])
      if (current[0] === target[0] && current[1] === target[1]) {
          return steps
      }
      let moves = nextFn(input, current)
      queue = queue.concat(moves.map(point => [point, steps + 1]))
  }
}

function test(testName, input, expected) {
  let str = dequal(input, expected) ? `passed: ${testName}` : `${testName} failed.  Expected ${expected}, received ${input}`
  console.log(str)
}

module.exports = {
  arrToString,
  breadthFirstSearch,
  convertStringWithDict,
  convertWithDict,
  fetchInput,
  getAdjacent,
  getGridSize,
  isAdjacent,
  parseCoord,
  pointsBetween,
  splitArray,
  test
}
