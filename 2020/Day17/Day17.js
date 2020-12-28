const helpers = require('../helpers');

const countNeighbors = (cube, dim, w, z, y, x) => {
  let count = 0;
  for (let z2 = -1; z2 <= 1; z2++) {
    for (let y2 = -1; y2 <= 1; y2++) {
      for (let x2 = -1; x2 <= 1; x2++) {
        if (dim === 4) {
          for (let w2 = -1; w2 <= 1; w2++) {
            if (w2 === 0 && z2 === 0 && y2 === 0 && x2 === 0) {
              continue;
            } else if (cube.has(`${w + w2},${z + z2},${y + y2},${x + x2}`)){
              count++;
            }
          }
        } else if (dim === 3) {
          if (z2 === 0 && y2 === 0 && x2 === 0) {
            continue;
          } else if (cube.has(`${z + z2},${y + y2},${x + x2}`)) {
            count++;
          }
        }
      }
    }
  }
  return count;
}

const buildCube = (input, dim) => {
  let cube = new Set();
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === '#') {
        if (dim === 4) {
          cube.add(`0,0,${y},${x}`, '#');
        } else {
          cube.add(`0,${y},${x}`, '#');
        }
      }
    }
  }
  return cube;
}

const runCycles = async(cycles, dim) => {
  let input = await helpers.fetchInput('Day17', '\n');
  let cube = buildCube(input, dim);
  let turn = 1;
  while (turn <= cycles) {
    let nextCube = new Set();
    let count;
    let width = turn + input.length + 1;
    for (let z = -width; z <= width; z++) {
      for (let y = -width; y <= width; y++) {
        for (let x = -width; x <= width; x++) {
          if (dim === 4) {
            for (let w = -width; w <= width; w++) {
              count = countNeighbors(cube, dim, w, z, y, x);
              if (count === 3 || (count === 2 && cube.has(`${w},${z},${y},${x}`))) {
                nextCube.add(`${w},${z},${y},${x}`, '#');
              }
            }
          } else {
            count = countNeighbors(cube, dim, 0, z, y, x);
            if (count === 3 || (count === 2 && cube.has(`${z},${y},${x}`))) {
              nextCube.add(`${z},${y},${x}`, '#');
            }
          }
        }
      }
    }
    cube = nextCube;
    turn++;
  }

  console.log('solution:', [...cube.values()].filter(value => value).length);
}

runCycles(6, 3);
