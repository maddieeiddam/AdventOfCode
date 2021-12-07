const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day6', ',', 'int');

const testInput = [3, 4, 3, 1, 2]

const part1 = (arr, days) => {
  if (days === 0) {
    console.log('number of fish:', arr.length);
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) {
        arr[i] = 6;
        arr.push(9)
      } else {
        arr[i]--;
      }
    }
    return part1(arr, days - 1);
  }
}

const part2 = (arr, days) => {
  let fishBuckets = new Array(9).fill(0);
  for (let i = 0; i < arr.length; i++) {
    fishBuckets[arr[i]]++;
  }
  while (days > 0) {
    let newFish = fishBuckets[0];
    // move all fish to the bucket with 1 less day
    for (let i = 0; i < fishBuckets.length - 1; i++) {
      fishBuckets[i] = fishBuckets[i + 1];
    }
    fishBuckets[6] += newFish;
    fishBuckets[8] = newFish;
    days--;
  }
  console.log('number of fish:', fishBuckets.reduce((x, y) => x + y));
}

part1(input, 80);
part2(input, 256);
