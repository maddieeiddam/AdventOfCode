/* eslint-disable complexity */
const helpers = require('../helpers');
const { rotate, unit } = require('mathjs');

const runInstructions = (obj, action, part) => {
  let op = action[0];
  let val = parseInt(action[1]);
  let dirs = {N: [0, 1], S: [0, -1], W: [-1, 0], E: [1, 0]};

  if (op in dirs) {
    let dx = dirs[op][0];
    let dy = dirs[op][1];
    obj.pos[0] += val * dx;
    obj.pos[1] += val * dy;
  }
  else if (op in {L: [], R: []}) {
    if (part === 1) {
      obj.deg += (op === 'L' ? val : (360 - val));
      obj.deg = obj.deg % 360;
    } else {
      let deg = op === 'L' ? val.toString() : (360 - val).toString();
      obj.pos = rotate(obj.pos, unit(deg + 'deg'));
    }
  }
  else if (op === 'F') {
    if (part === 1) {
      if (obj.deg === 0) {
        obj.pos[0] += val;
      } else if (obj.deg === 180) {
        obj.pos[0] -= val;
      } else if (obj.deg === 90) {
        obj.pos[1] += val;
      } else if (obj.deg === 270) {
        obj.pos[1] -= val;
      }
    } else {
      let count = 0;
      while (count < val) {
        obj.ship[0] += obj.pos[0];
        obj.ship[1] += obj.pos[1];
        count++;
      }
    }
  }
  return obj;
}

const readInstructions = async () => {
  let input = await (await helpers.fetchInput('Day12')).map(instr => {
    if (instr.length > 0) {
      return [instr.substring(0, 1), instr.substring(1, instr.length)]
    }
  });

  // part 1
  let posObj1 = {deg: 0, pos: [0, 0]};
  for (let i = 0; i < input.length; i++) {
    posObj1 = runInstructions(posObj1, input[i], 1);
  }
  console.log('pt 1 manhattan distance:', Math.abs(posObj1.pos[0]) + Math.abs(posObj1.pos[1]));

  // part 2: now pos is the waypoint's position and ship is the ship's position
  let posObj2 = {deg: 0, pos: [10, 1], ship: [0, 0]}
  for (let i = 0; i < input.length; i++) {
    posObj2 = runInstructions(posObj2, input[i], 2);
  }
  console.log('pt 2 manhattan distance:', Math.abs(posObj2.ship[0]) + Math.abs(posObj2.ship[1]))
}

readInstructions();
