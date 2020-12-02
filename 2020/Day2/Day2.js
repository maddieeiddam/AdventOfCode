const helpers = require('../helpers');

const parseLine = line => {
  let lineArr = line.split(' ');
  let pwObj = {
    min:    parseInt(lineArr[0].split('-')[0]),
    max:    parseInt(lineArr[0].split('-')[1]),
    letter: lineArr[1].split(':')[0],
    pw:     lineArr[2]
  };
  return pwObj;
}

const checkValidity = pwObj => {
  let letterCount = 0;
  for (let i = 0; i < pwObj.pw.length; i++) {
    if (pwObj.pw.charAt(i) === pwObj.letter) {
      letterCount += 1;
    }
  }
  if (letterCount >= pwObj.min && letterCount <= pwObj.max) {
    return 1;
  } else {
    return 0;
  }
}

const checkNewValidity = pwObj => {
  if (pwObj.pw.charAt(pwObj.min - 1) === pwObj.letter) {
    if (pwObj.pw.charAt(pwObj.max - 1) === pwObj.letter) {
      return 0;
    } else {
      return 1;
    }
  } else {
    if (pwObj.pw.charAt(pwObj.max - 1) === pwObj.letter) {
      return 1;
    } else {
      return 0;
    }
  }
}

const checkPasswords = async () => {
  let input = await helpers.fetchInput('Day2');
  let validCount = 0;
  for (let i = 0; i < input.length; i++) {
    let pwObj = parseLine(input[i]);
    validCount += checkNewValidity(pwObj);
  }
  console.log('valid passwords:', validCount);
}

checkPasswords();
