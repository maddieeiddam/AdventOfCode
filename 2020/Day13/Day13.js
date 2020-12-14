const helpers = require('../helpers');

const earliestBus = async () => {
  let input = await helpers.fetchInput('Day13');
  let timestamp = parseInt(input[0]);
  let buses = input[1].split(',')
  let earliest = {id: null, time: 100000000000000000};
  for (let i = 0; i < buses.length; i++) {
    if (buses[i] !== 'x') {
      let remainder = timestamp % parseInt(buses[i]);
      let nextTime = timestamp - remainder + parseInt(buses[i]);
      if (nextTime < earliest.time) {
        earliest = {id: buses[i], time: nextTime};
      }
    }
  }
  console.log('part 1 solution:', earliest.id * (earliest.time - timestamp));
}

const modInverse = (a, m) => {
  a = a % m;
  for (let i = 0; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  return 1;
}

const earliestTime = async () => {
  let input = await helpers.fetchInput('Day13');
  let buses = input[1].split(',');
  let N = 1;
  let system = [];
  for (let i = 0; i < buses.length; i++) {
    if (buses[i] !== 'x') {
      N = N * parseInt(buses[i]);
      system.push({
        b: (buses.length - 1) - i,
        n: parseInt(buses[i])
      });
    }
  }
  let t = 0;
  for (let i = 0; i < system.length; i++) {
    system[i].m = N / system[i].n;
    system[i].y = modInverse(system[i].m, system[i].n);
    t += system[i].y * system[i].b * system[i].m;
  }
  console.log('part 2 solution:', (t % N) - (buses.length - 1));
}

earliestBus();
earliestTime();
