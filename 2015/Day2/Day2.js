const helpers = require('../../helpers');

const calculatePaper = async () => {
  let input = await (await helpers.fetchInput('2015', 'Day2', '\n')).map(str => str.split('x'));
  let paperArea = 0;
  let ribbonLength = 0;
  for (let i = 0; i < input.length; i++) {
    input[i] = input[i].map(str => parseInt(str)).sort((a, b) => a - b);
    paperArea += 2 * input[i][0] * input[i][1] + 2 * input[i][0] * input[i][2] + 2 * input[i][1] * input[i][2] + input[i][0] * input[i][1];
    ribbonLength += 2 * input[i][0] + 2 * input[i][1] + input[i][0] * input[i][1] * input[i][2];
  }
  console.log('paper needed:', paperArea);
  console.log('ribbon needed:', ribbonLength);
}

calculatePaper();
