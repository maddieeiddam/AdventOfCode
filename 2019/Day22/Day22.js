const fs = require('fs-extra');
const path = require('path');

const dealIntoNewStack = deck => {
  return deck.reverse();
}

const cutCards = (deck, n) => {
  if (n >= 0) {
    let toCut = deck.splice(0, n);
    return deck.concat(toCut);
  } else {
    let toCut = deck.splice(n, Math.abs(n));
    return toCut.concat(deck);
  }
}

const dealWithIncrement = (deck, incr) => {
  let deckSize = deck.length;
  let newDeck = new Array(deckSize);
  let pointer = 0;
  while (deck.length > 0) {
    if (pointer <= deckSize) {
      newDeck[pointer] = deck.shift();
      pointer = pointer + incr;
    } else {
      pointer = pointer - deckSize;
    }
  }
  return newDeck;
}

const parseInstr = instruction => {
  let instrArray = instruction.split(' ');
  let num = instrArray.pop();
  return parseInt(num);
}

const shuffleDeck = async () => {
  let input = await (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n');
  let deck = Array.from(Array(119315717514047).keys());
  for (let i = 0; i < input.length; i++) {
    let instruction = input[i];
      if (instruction.includes('deal with increment')) {
        let num = parseInstr(instruction);
        deck = dealWithIncrement(deck, num);
    } else if (instruction.includes('deal into new stack')) {
      deck = dealIntoNewStack(deck);
    } else if (instruction.includes('cut')) {
      let num = parseInstr(instruction);
      deck = cutCards(deck, num);
    }
  }

  console.log('index of 2019:', deck.indexOf(2019));
}

shuffleDeck();
