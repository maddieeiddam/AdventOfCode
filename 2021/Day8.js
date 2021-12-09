const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day8', '\n');

const testInput = ['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'];

// assume strA is always shorter than strB
const stringDiff = (strA, strB) => {
  let sumA = 0;
  let sumB = 0;
  let i = 0;
  for (;i < strA.length; i++) {
    sumA += strA[i].charCodeAt(0);
    sumB += strB[i].charCodeAt(0);
  }
  if (strB.length > strA.length) {
    sumB += strB[i].charCodeAt(0);
  }
  return String.fromCharCode(sumB - sumA);
}

// assume strA is always shorter than strB
const stringIncludes = (strA, strB) => {
  let arr = strA.split('');
  for (let i = 0; i < arr.length; i++) {
    if (!strB.includes(arr[i])) {
      return false
    }
  }
  return true;
}

const sortString = str => {
  return str.split('').sort().join('');
}

const part1 = arr => {
  let segmentCount = 0;
  for (let i = 0; i < arr.length; i++) {
    let output = arr[i].split(' | ')[1].split(' ');
    for (let j = 0; j < output.length; j++) {
      if ([2, 4, 3, 7].includes(output[j].length)) {
        segmentCount++;
      }
    }
  }
  console.log('part 1 solution:', segmentCount);
}

// eslint-disable-next-line complexity
const part2 = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    let patternObj = {};
    for (let j = 0; j < 10; j++) {
      patternObj[j] = {opts: []};
    }
    let output = arr[i].split(' | ')[1].split(' ').map(itm => sortString(itm));
    let signals = arr[i].split(' | ')[0].split(' ').map(itm => sortString(itm));
    for (let k = 0; k < signals.length; k++) {
      switch (signals[k].length) {
        case 2:
          patternObj[1] = signals[k]
          break;
        case 3:
          patternObj[7] = signals[k]
          break;
        case 4:
          patternObj[4] = signals[k]
          break;
        case 5:
          patternObj[2].opts.push(signals[k]);
          patternObj[3].opts.push(signals[k]);
          patternObj[5].opts.push(signals[k]);
          break;
        case 6:
          patternObj[0].opts.push(signals[k]);
          patternObj[6].opts.push(signals[k]);
          patternObj[9].opts.push(signals[k]);
          break;
        case 7:
          patternObj[8] = signals[k];
          break;
        default:
          console.log('unknown length');
      }
    }
    // the letter that 7 has and 2 does not must be segment A
    patternObj.A = stringDiff(patternObj[1], patternObj[7]);

    // 9 is the only 6 segment option that has all segments of 4, its extra letter is G
    patternObj[9].opts.forEach(opt => {
      if (stringIncludes(patternObj[4], opt)) {
        patternObj[9] = opt;
      }
    })
    patternObj.G = stringDiff(patternObj[4].concat(patternObj.A), patternObj[9]);

    // the only segment 9 is missing is E
    patternObj.E = stringDiff(patternObj[9], patternObj[8]);

    // 2 is the only 5 segment option that contains E
    patternObj[2].opts.forEach(opt => {
      if (stringIncludes(patternObj.E, opt)) {
        patternObj[2] = opt;
      }
    })

    // 0 is the only remaining 6 segment option that has all segments of 1
    patternObj[0].opts.forEach(opt => {
      if (stringIncludes(patternObj[1], opt) && opt !== patternObj[9]) {
        patternObj[0] = opt;
      } else if (opt !== patternObj[9]) {
        patternObj[6] = opt;
      }
    })

    // 6 contains all segments of 5, but not all segments of 3
    patternObj[5].opts.forEach(opt => {
      if (stringIncludes(opt, patternObj[6]) && opt !== patternObj[2]) {
        patternObj[5] = opt;
      } else if (opt !== patternObj[2]){
        patternObj[3] = opt;
      }
    })

    // finally deal with the output
    for (let j = 0; j < output.length; j++) {
      for (let key in patternObj) {
        if (output[j] === patternObj[key]) {
          output[j] = key;
        }
      }
    }
    sum += parseInt(output.join(''), 10)
  }
  console.log('part 2 solution:', sum);
}

part1(input);
part2(input);
