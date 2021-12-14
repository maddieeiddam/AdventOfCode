/* eslint-disable guard-for-in */
const helpers = require('./../helpers');
let [inputDots, inputInstrs] = helpers.fetchInput('2021', 'Day13', '\n\n');
inputDots = inputDots.split('\n')
inputInstrs = inputInstrs.split('\n').filter(el => el.length > 0)

let testDots = ['6,10', '0,14', '9,10', '0,3', '10,4', '4,11', '6,0', '6,12', '4,1', '0,13', '10,12', '3,4', '3,0', '8,4', '1,10', '2,14', '8,10', '9,0'];

const fold = (obj, dir, line) => {
  if (dir === 'y') {
    for (let key in obj) {
      obj[key].forEach(pt => {
        if (pt > line) {
          let newPt = line - (pt - line)
          obj[key].delete(pt)
          obj[key].add(newPt)
        }
      })
    }
  } else {
    for (let key in obj) {
      if (key > line) {
        let newKey = line - (key - line)
        if (!obj[newKey]) {
          obj[newKey] = new Set([...obj[key]])
          delete obj[key]
        } else {
          obj[newKey] = new Set([...obj[newKey], ...obj[key]])
          delete obj[key]
        }
      }
    }
  }
  return obj
}

const drawDots = obj => {
  let cols = 0;
  let rows = 0;
  for (let key in obj) {
    cols = parseInt(key, 10) > cols ? parseInt(key, 10) : cols
    let r = Math.max.apply(this, [...obj[key]])
    rows = r > rows ? r : rows
  }
  let paper = [];
  while (rows >= 0) {
    paper.push(new Array(cols).fill('.'))
    rows--
  }

  for (let key in obj) {
    obj[key].forEach(pt => {
      paper[pt][parseInt(key, 10)] = '#'
    })
  }

  paper.forEach(row => {
    console.log(row.join(''))
  })
}

const origami  = (dots, instr = []) => {
  let dotObj = {};
  dots = dots.map(dot => dot.split(',').map(Number))
  dots.forEach(dot => {
    if (!dotObj[dot[0]]) {
      dotObj[dot[0]] = new Set().add(dot[1])
    } else {
      dotObj[dot[0]].add(dot[1])
    }
  })
  if (instr.length === 0) {
    dotObj = fold(dotObj, 'x', 655)
    let size = 0
    for (let keys in dotObj) {
      size += dotObj[keys].size
    }
    console.log('part 1 solution:', size)
  } else {
    instr.forEach(i => {
      let [dir, line] = i.split(' ')[2].split('=')
      dotObj = fold(dotObj, dir, parseInt(line, 10))
    })
    console.log('part 2 solution:')
    drawDots(dotObj)
  }
}

origami(inputDots);
origami(inputDots, inputInstrs);
