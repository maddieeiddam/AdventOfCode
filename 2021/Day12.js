const helpers = require('./../helpers');
const input = helpers.fetchInput('2021', 'Day12', '\n');

let testInput = ['start-A', 'start-b', 'A-c', 'A-b', 'b-d', 'A-end', 'b-end'];
let test2 = ['dc-end', 'HN-start', 'start-kj', 'dc-start', 'dc-HN', 'LN-dc', 'HN-end', 'kj-sa', 'kj-HN', 'kj-dc'];

const getPaths = (arr, part) => {
  let allNodes = {}
  // build the cave system
  for (let i = 0; i < arr.length; i++) {
    let [node1, node2] = arr[i].split('-');
    if (!allNodes[node1]) allNodes[node1] = [];
    allNodes[node1].push(node2);

    if (!allNodes[node2]) allNodes[node2] = [];
    if (node1 !== 'start') allNodes[node2].push(node1);
  }

  const paths = [];
  const findPaths = (node, visited, canDouble) => {
    visited.push(node);
    if (node === 'end') {
      paths.push(visited.toString());
    } else {
      allNodes[node].forEach(child => {
        let visited2 = visited.slice();
        if (!visited.includes(child)) {
          findPaths(child, visited2, canDouble);
        } else if (child === child.toUpperCase()) {
          findPaths(child, visited2, canDouble);
        } else if (canDouble && child !== 'start') {
          findPaths(child, visited2, false);
        }
      })
    }
  }

  let canDouble = part === 2
  allNodes.start.forEach(node => {
    findPaths(node, ['start'], canDouble);
  })
  console.log('solution:', paths.length);
}

getPaths(input, 2);
