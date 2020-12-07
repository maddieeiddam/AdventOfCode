const fs = require('fs-extra');
const path = require('path');

async function fetchInput(dayStr, splitOn = '\n') {
  let input = await (await fs.readFile(path.join(__dirname, dayStr, 'input.txt'), 'utf8')).split(splitOn).filter(function(el) {
    return el.length > 0;
  });
  return input;
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
