const helpers = require('./../helpers');
let [tmp, rls] = helpers.fetchInput('2021', 'Day14', '\n\n');

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const takeTurn = (rulesObj, nodes) => {
  for (let i = 0; i < nodes.length - 1; i++) {
    let node1 = nodes[i];
    let node2 = nodes[i + 1];

    let pair = node1.val + node2.val
    if (rulesObj[pair]) {
      node1.next = new Node(rulesObj[pair])
    }
  }

  let newNodes = [];
  for (let j = 0; j < nodes.length; j++) {
    let newNode1 = nodes[j];
    newNodes.push(newNode1);

    if (newNode1.next) {
      newNodes.push(newNode1.next);
      newNode1.next = null;
    }
  }
  return newNodes;
}

const createPolymer = (template, rules, turns) => {
  let rulesObj = {};
  rules.forEach(rule => {
    let [pair, val] = rule.split(' -> ')
    if (pair && !rulesObj[pair]) {
      rulesObj[pair] = val
    }
  })

  let nodes = template.map(val => new Node(val));

  let turn = 1;
  while (turn <= turns) {
    nodes = takeTurn(rulesObj, nodes)
    turn++
  }

	let elementCount = nodes.reduce((acc, node) => {
		acc[node.val] = acc[node.val] ? acc[node.val] + 1 : 1;
		return acc;
	}, {});

  let min = 100000;
  let max = 0;
  for (let key in elementCount) {
    if (elementCount[key] < min) {
      min = elementCount[key]
    } else if (elementCount[key] > max) {
      max = elementCount[key]
    }
  }
	console.log(`solution after ${turns} turns:`, max - min);
}

createPolymer(tmp.split(''), rls.split('\n'), 10);
