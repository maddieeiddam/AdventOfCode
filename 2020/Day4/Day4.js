/* eslint-disable complexity */
const helpers = require('../helpers');

const validateField = (field, value, reg) => {
  let regex = RegExp(reg);
  if (regex.test(value)) {
    if (field === 'byr') {
      return (value >= 1920 && value <= 2002);

    } else if (field === 'iyr') {
      return (value >= 2010 && value <= 2020);

    } else if (field === 'eyr') {
      return (value >= 2020 && value <= 2030)

    } else if (field === 'hgt') {
      let units = value.match(/[a-zA-z]+/g);
      let val = value.match(/\d+/g);
      if (units[0] === 'cm') {
        return (val[0] >= 150 && val[0] <= 193);
      } else if (units[0] === 'in') {
        return (val[0] >= 59 && val[0] <= 76);
      }

    } else if (field === 'ecl') {
      let validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
      return (validColors.includes(value));
    }
    return true;
  } else {
    return false;
  }
}

const checkPassports = async () => {
  let input = await helpers.fetchInput('Day4', '\n\n');
  let validCount = input.length;
  let validationObj = {
    ecl: '^[a-zA-Z]{3}$',
    pid: '^\\d{9}$',
    eyr: '^\\d{4}$',
    hcl: '^#([0-9a-fA-F]{6})$',
    byr: '^\\d{4}$',
    iyr: '^\\d{4}$',
    hgt: '^[0-9]{2,3}\\s*(cm|in)$'
  };

  // parse input into an array of objects with key/val pairs
  for (let i = 0; i < input.length; i++) {
    let result = {};
    input[i] = input[i].replace(/\n/g, ' ');
    let passport = input[i].split(' ').map(pair => pair.split(':'));
    passport.forEach(([key, value]) => result[key] = value);
    input[i] = result;

    // loop through required keys and use regex to validate values
    for (let key in validationObj) {
      if (validationObj.hasOwnProperty(key)) {
        if (!(input[i].hasOwnProperty(key))) {
          validCount--;
          break;
        } else {
          if (!validateField(key, input[i][key], validationObj[key])) {
            validCount--;
            break;
          }
        }
      }
    }

  }
  console.log(validCount);
}

checkPassports();
