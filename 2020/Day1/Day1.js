const fs = require('fs-extra');
const path = require('path');

const find2020 = async (addends = 2) => {
  let input = await (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf8')).split('\n').map(num => parseInt(num));
  for (let i = 0; i < input.length - 1; i++) {
    let num1 = input[i];
    for (let j = i + 1; j < input.length; j++) {
      let num2 = input[j];
      if (addends === 2) {
        if (num1 + num2 === 2020) {
          console.log(num1 * num2);
        }
      } else if (addends === 3) {
        let sum = num1 + num2;
        for (let k = i + 2; k < input.length; k++) {
          let num3 = input[k];
          if (sum + num3 === 2020) {
            console.log(num1 * num2 * num3);
          }
        }
      } else { console.log('this only works with 2 or 3 addends, mannnn')}
    }
  }
}

find2020(3);
