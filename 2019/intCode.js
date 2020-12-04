
class Computer {
  constructor(program) {
    this.program = program;     // the puzzle input provided
    this.memory = [];           // starts as puzzle input and gets modified through run
    this.pointer = 0;           // the address of the current instruction
    this.complete = false;      // stays false until opcode 99 is hit
  }

  run(modifyObj = {}) {
    this.initializeComputer();
    // if a modify object has been passed, adjust given values prior to run
    if (Object.keys(modifyObj).length > 0) {
      for (let key in modifyObj) {
        if (modifyObj.hasOwnProperty(key)) {
          this.memory[key] = modifyObj[key];
        }
      }
    }
    while (this.complete === false) {
      if (this.memory[this.pointer] === 99) {
        this.complete = true;
      } else {
        this.runInstr(this.memory[this.pointer]);
      }
    }
  }

  initializeComputer() {
    // set memory to an integer array version of the program
    this.memory = this.program.split(',').map(str => parseInt(str));
  }

  runInstr(pointer) {
    let param1 = this.pointer + 1;
    let param2 = this.pointer + 2;
    let param3 = this.pointer + 3;
    switch (pointer) {
      case 1:
        this.memory[this.memory[param3]] = this.memory[this.memory[param1]] + this.memory[this.memory[param2]];
        this.pointer += 4;
        break;
      case 2:
        this.memory[this.memory[param3]] = this.memory[this.memory[param1]] * this.memory[this.memory[param2]];
        this.pointer += 4;
        break;
      case 3:

      default:
        console.log('unknown instruction opcode');
    }
  }

  getAddress(pos) {
    // grab the value at a specific address in memory
    return this.memory[pos];
  }

  resetMemory() {
    // reset memory to the initial puzzle input
    this.state = this.program;
  }
}

module.exports = {Computer};
