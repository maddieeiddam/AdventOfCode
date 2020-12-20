const createMemory = (memory, num, turn) => {
  memory[num] = {
    mostRecent: turn,
    spoken: false
  }
  return memory;
}

const memoryGame = turns => {
  let input = [14, 3, 1, 0, 9, 5];
  let turn = 1;
  let lastNum = null;
  let memory = {};

  if (Object.keys(memory).length === 0) {
    for (let i = 0; i < input.length; i++) {
      lastNum = input[i];
      createMemory(memory, lastNum, turn);
      turn++;
    }
  }
  while (turn <= turns) {
    // last num was said only once before, so say 0:
    if (lastNum in memory && !(memory[lastNum].spoken)) {
      memory[lastNum].mostRecent = turn - 1;
      memory[0].spoken = true;
      lastNum = 0;
      turn++;
    // last num has been said twice+ before, so say the difference:
    } else if (lastNum in memory) {
      let newNum = turn - 1 - memory[lastNum].mostRecent;
      memory[lastNum].mostRecent = turn - 1;
      lastNum = newNum;
      turn++;
      if (newNum in memory) {
        memory[newNum].spoken = true;
      } else {
        createMemory(memory, newNum, turn);
      }
    }
  }
  console.log('turn 2020 saying', lastNum);
}

memoryGame(2020);
