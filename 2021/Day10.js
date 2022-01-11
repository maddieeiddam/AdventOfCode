const helpers = require('./../helpers');
let input = helpers.fetchInput('2021', 'Day10', '\n');
let scores = [];

const evalCloser = (actual, target) => {
  let bracketObj = {
    ')': ['(', 3],
    ']': ['[', 57],
    '}': ['{', 1197],
    '>': ['<', 25137]
  };
  if (bracketObj[actual][0] !== target) {
    return bracketObj[actual][1]
  }
  return 0;
}

const getScore = (opened, score) => {
  let bracketObj = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
  }
  while (opened.length > 0) {
    let current = opened.pop()
    score = score * 5
    score += bracketObj[current]
  }
  return score
}

const getPoints = line => {
  let openers = ['(', '[', '{', '<']
  let points = 0
  let opened = []
  for (let i = 0; i < line.length; i++) {
    if (openers.includes(line[i])) {
      opened.push(line[i])
    } else {
      points += evalCloser(line[i], opened.pop())
    }
  }

  // if the line is not corrupted, it must be incomplete
  if (points === 0) {
    let score = getScore(opened, 0)
    scores.push(score)
  }
  return points
}

const part1 = lines => {
  let points = 0;
  lines.forEach(line => {
    line = line.split('')
    points += getPoints(line)
  })
  console.log('part 1 solution:', points)
  scores.sort((a, b) => a - b)
  console.log('part 2 solution:', scores[Math.floor(scores.length / 2)])
}

part1(input)
