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

module.exports = {
  fetchInput,
  splitArray,
  arrToString
}
