const helpers = require('../helpers');

const parseSeat = (str, min, max) => {
  if (max - min === 1 || max === min) {
    if (str.charAt(0) === 'F' || str.charAt(0) === 'L') {
      return min;
    } else {
      return max;
    }
  } else {
    if (str.charAt(0) === 'F' || str.charAt(0) === 'L') {
      return parseSeat(str.substring(1), min, Math.floor((min + max) / 2));
    } else {
      return parseSeat(str.substring(1), Math.ceil((min + max) / 2), max);
    }
  }
}

const scanPasses = async () => {
  let input = await helpers.fetchInput('Day5');
  let maxID = 0;
  let minID = 10000;
  let allIDs = [];
  for (let i = 0; i < input.length; i++) {
    let row = parseSeat(input[i], 0, 127);
    let col = parseSeat(input[i].substring(input[i].length - 3), 0, 7);
    let seatID = row * 8 + col;
    if (seatID > maxID) {
      maxID = seatID;
    }
    if (seatID < minID) {
      minID = seatID;
    }
    allIDs.push(seatID);
  }
  console.log('highest seat ID:', maxID);
  for (let i = minID; i < maxID; i++) {
    if (!allIDs.includes(i + 1)) {
      console.log('missing ID:', i + 1);
    }
  }
}

scanPasses();
