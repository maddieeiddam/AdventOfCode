const fs = require('fs-extra');
const path = require('path');

async function fetchInput(dayStr) {
  let input = await (await fs.readFile(path.join(__dirname, dayStr, 'input.txt'), 'utf8')).split('\n').filter(function(el) {
    return el.length > 0;
  });
  return input;
}

module.exports = {
  fetchInput
}
