const helpers = require('../../helpers');

const countFloors = async () => {
  let input = await helpers.fetchInput('2015', 'Day1', '');
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      floor++;
      if (floor === -1) {
        console.log('in basement at instruction', i + 1);
      }
    } else if (input[i] === ')') {
      floor--;
      if (floor === -1) {
        console.log('in basement at instruction', i + 1);
      }
    }
  }
  console.log('floor:', floor);
}

countFloors();
