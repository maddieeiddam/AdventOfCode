const helpers = require('../helpers');

const parseList = async () => {
  let input = await helpers.fetchInput('Day6', '\n\n');
  let anyYesCount = 0;
  let allYesCount = 0;
  for (let i = 0; i < input.length; i++) {
    let groupSize = 0;
    let anyYesArr = [];
    let peopleArr = input[i].split('\n');
    for (let j = 0; j < peopleArr.length; j++) {
      groupSize++;
      for (let k = 0; k < peopleArr[j].length; k++) {
        if (!anyYesArr.includes(peopleArr[j][k])) {
          anyYesArr.push(peopleArr[j][k]);
        }
      }
    }
    anyYesCount += anyYesArr.length;
    for (let l = 0; l < anyYesArr.length; l++) {
      if (input[i].split(anyYesArr[l]).length - 1 === groupSize) {
        allYesCount++;
      }
    }
  }
  console.log('questions anyone answered yes:', anyYesCount);
  console.log('questions everyone answered yes:', allYesCount);
}

parseList();
