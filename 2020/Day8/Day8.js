const helpers = require('../helpers');

const buildProgram = async () => {
  let input = helpers.splitArray(await helpers.fetchInput('Day8'), ' ');
  let parsedInput = [];
  for (let i = 0; i < input.length; i++) {
    let instruction = {
      op:   input[i][0],
      arg:  parseInt(input[i][1]),
      run:  false
    };
    parsedInput.push(instruction);
  }
  return parsedInput;
}

const runAccumulator = (program, accumulator, pointer) => {
  while (pointer < program.length && program[pointer].run === false) {
    if (program[pointer].op === 'acc') {
      accumulator += program[pointer].arg;
      program[pointer].run = true;
      pointer++;
    } else if (program[pointer].op === 'jmp') {
      program[pointer].run = true;
      pointer += program[pointer].arg;
    } else if (program[pointer].op === 'nop') {
      program[pointer].run = true;
      pointer++;
    }
  }
  console.log('accumulator:', accumulator);
  if (program[pointer]) {
    return !program[pointer].run;
  } else {
    return true;
  }
}

const fixInfiniteLoop = async () => {
  let terminated = false;
  for (let i = 0; i < 653; i++) {
    let program = await buildProgram();
    if (terminated === false) {
      console.log('modifying index', i);
      if (program[i].op === 'jmp') {
        program[i].op = 'nop';
        terminated = runAccumulator(program, 0, 0);
      } else if (program[i].op === 'nop') {
        program[i].op = 'jmp';
        terminated = runAccumulator(program, 0, 0);
      }
    } else {
      console.log('program terminated');
      break;
    }
  }
}

buildProgram().then(res => runAccumulator(res, 0, 0));
fixInfiniteLoop();
