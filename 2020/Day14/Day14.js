/* eslint-disable complexity */
const helpers = require('../helpers');

const applyMask = (part, mask, bin) => {
  for (let i = 0; i < mask.length; i++) {
    if (part === 1 && mask[i] !== 'X') {
      bin[i] = parseInt(mask[i]);
    } else if (part === 2 && mask[i] !== '0') {
      bin[i] = mask[i];
    }
  }
  return bin;
}

let buildFloat = arr => {
  let options = [];
  for (let i = 0; i < arr.length; i++) {
    if (options.length === 0) {
      if (arr[i] === 'X') {
        options.push('1');
        options.push('0');
      } else {
        options.push(arr[i]);
      }
    } else if (arr[i] === 'X') {
      let optionsCopy = [...options];
      for (let j = 0; j < optionsCopy.length; j++) {
        options[j] = options[j] + '1';
        optionsCopy[j] = optionsCopy[j] + '0';
      }
      options = options.concat(optionsCopy);
    } else {
      for (let j = 0; j < options.length; j++) {
        options[j] = options[j] + arr[i];
      }
    }
  }
  return options;
}

const runDecoder = async (part) => {
  let input = await helpers.fetchInput('Day14');
  let mask;
  let memory = {};

  for (let i = 0; i < input.length; i++) {

    if (input[i].includes('mask = ')) {
      mask = input[i].split(' = ')[1];

    } else {
      let address = input[i].split(' = ')[0].split('[')[1].split(']')[0];
      let value = parseInt(input[i].split(' = ')[1]);
      if (part === 1) {
        value = value.toString(2)
          .padStart(36, '0')
          .split('')
        applyMask(1, mask, value);
        memory[address] = parseInt(value.join(''), 2);
      } else {
        address = parseInt(address)
          .toString(2)
          .padStart(36, '0')
          .split('')
        address = applyMask(2, mask, address);
        let addresses = buildFloat(address);
        for (let j = 0; j < addresses.length; j++) {
          memory[(parseInt(addresses[j], 2))] = value;
        }
      }
    }
  }
  console.log(Object.values(memory).reduce((a, b) => a + b, 0));
}

runDecoder(2);
