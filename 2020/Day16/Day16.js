const helpers = require('../helpers');

const parseFields = arr => {
  let validObj = {};
  let allValid = new Set();
  arr = arr.split('\n');
  for (let i = 0; i < arr.length; i++) {
    let field = arr[i].split(':')[0];
    let values = arr[i].split(' ')
      .filter(x => x.match(/^[^a-zA-Z]+$/));
    validObj[field] = {
      position: [],
      valid: [],
    };
    for (let j = 0; j < values.length; j++) {
      let start = parseInt(values[j].split('-')[0]);
      let end = parseInt(values[j].split('-')[1]);
      while (start <= end) {
        validObj[field].valid.push(start);
        allValid.add(start);
        start++;
      }
    }
  }
  return {validObj, allValid};
}

const getValidTickets = (allValid, ticket, nearby) => {
  let validTickets = [];
  let sum = 0;
  ticket = ticket.split('\n')[1]
    .split(',')
    .map(x => parseInt(x));
  nearby = nearby.split('\n')
    .filter(x => x.match(/^[^a-zA-Z]+$/))
    .map(x => x.split(',')
      .map(y => parseInt(y)));
  for (let i = 0; i < nearby.length; i++) {
    let valid = true;
    for (let j = 0; j < nearby[i].length; j++) {
      if (!allValid.has(nearby[i][j])) {
        sum += nearby[i][j];
        valid = false;
      }
    }
    if (valid === true) {
      validTickets.push(nearby[i]);
    }
  }
  console.log('part 1 solution:', sum);
  return validTickets;
}

const positionValid = (values, tickets, idx) => {
  for (let i = 0; i < tickets.length; i++) {
    if (values.indexOf(tickets[i][idx]) === -1) {
      return false;
    }
  }
  return true;
}

const findPositions = (validObj, validTickets) => {
  let possLocations;
  for (let key in validObj) {
    if (validObj.hasOwnProperty(key)) {
      possLocations = [];
      let pos = 0;
      while (pos < validTickets[0].length) {
        if (positionValid(validObj[key].valid, validTickets, pos)) {
          possLocations.push(pos);
        }
        pos++;
      }
      validObj[key].position = possLocations;
    }
  }
  return validObj;
}

const removeDupes = (validObj, target = null, completeCount = 0) => {
  if (completeCount === Object.keys(validObj).length) {
    return validObj;
  } else {
    for (let key in validObj) {
      if (validObj.hasOwnProperty(key) && target!== null && Array.isArray(validObj[key].position)) {
        validObj[key].position = validObj[key].position.filter(x => x !== target);
      }
    }
    for (key in validObj) {
      if (validObj.hasOwnProperty(key) && validObj[key].position.length === 1) {
        validObj[key].position = validObj[key].position[0];
        return removeDupes(validObj, validObj[key].position, completeCount + 1);
      }
    }
  }
}

const translateTickets = async () => {
  let [fields, ticket, nearby] = await helpers.fetchInput('Day16', '\n\n');
  let {validObj, allValid} = parseFields(fields);
  let validTickets = getValidTickets(allValid, ticket, nearby);
  let product = 1;

  validObj = findPositions(validObj, validTickets);
  validObj = removeDupes(validObj);
  ticket = ticket.split('\n')[1].split(',').map(x => parseInt(x));

  for (let key in validObj) {
    if (validObj.hasOwnProperty(key) && key.includes('departure')) {
      product = product * ticket[validObj[key].position];
    }
  }
  console.log('part 2 solution:', product);
}

translateTickets();
