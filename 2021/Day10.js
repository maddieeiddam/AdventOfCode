const helpers = require('./../helpers');
let input = helpers.fetchInput('2021', 'Day10', '\n');

const evalCloser = (actual, target) => {
  let bracketObj = {
    ')': ['(', 3],
    ']': ['[', 57],
    '}': ['{', 1197],
    '>': ['<', 25137]
  };
  if (bracketObj[actual][0] !== target) {
    console.log('got', actual, 'expected', target)
    console.log('adding', bracketObj[actual][1], 'points')
    return bracketObj[actual][1]
  }
  return 0;
}

const part1 = lines => {
  let openers = ['(', '[', '{', '<'];
  let points = 0;
  lines.forEach(line => {
    line = line.split('')
    let opened = [];
    for (let i = 0; i < line.length; i++) {
      if (openers.includes(line[i])) {
        opened.push(line[i])
      } else {
        points += evalCloser(line[i], opened.pop())
      }
    }
  })
  console.log('total points:', points)
}

part1(input)
