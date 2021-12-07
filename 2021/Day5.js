const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day5', '\n').map(row => {
  return row.split(' -> ').map(pt => pt.split(',').map(Number));
})

const plotPoints = (obj, x, y) => {
  if (!obj.hasOwnProperty(`${x},${y}`)) {
    obj[`${x},${y}`] = 1;
  } else {
    obj[`${x},${y}`]++;
    if (obj[`${x},${y}`] === 2) {
      obj.overlaps++;
    }
  }
  return obj;
}

const plotVents = (arr, part) => {
  let pointsObj = {overlaps: 0};
  for (let pair of arr) {
    // horizontal lines
    if (pair[0][1] === pair[1][1]) {
      let x1 = Math.min(pair[0][0], pair[1][0]);
      let x2 = Math.max(pair[0][0], pair[1][0]);
      let y = pair[0][1];
      for (let x = x1; x <= x2; x++) {
        pointsObj = plotPoints(pointsObj, x, y);
      }
    // vertical lines
    } else if (pair[0][0] === pair[1][0]) {
      let y1 = Math.min(pair[0][1], pair[1][1]);
      let y2 = Math.max(pair[0][1], pair[1][1]);
      let x = pair[0][0];
      for (let y = y1; y <= y2; y++) {
        pointsObj = plotPoints(pointsObj, x, y);
      }
    } else if (part === 2) {
      //diagonal lines
      let point1 = (pair[0][0] < pair[1][0]) ? pair[0] : pair[1];
      let point2 = (point1 === pair[0]) ? pair[1] : pair[0];
      let slope = (pair[1][1] - pair[0][1]) / (pair[1][0] - pair[0][0])
      let y = point1[1];
      for (let x = point1[0]; x <= point2[0]; x++) {
        pointsObj = plotPoints(pointsObj, x, y);
        y = y + 1 * slope;
      }
    }
  }
  console.log('overlapping points:', pointsObj.overlaps);
}

plotVents(input, 2);
