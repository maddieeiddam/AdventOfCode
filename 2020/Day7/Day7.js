const helpers = require('../helpers');

const buildTree = async () => {
  let input = await helpers.fetchInput('Day7');
  let bagObj = {};
  for (let i = 0; i < input.length; i++) {
    let bagType = input[i].split(' bags')[0];
    if (!bagObj.hasOwnProperty(bagType)) {
      bagObj[bagType] = [];
      let insideBags = input[i].split('contain')[1].split(',');
      for (let j = 0; j < insideBags.length; j++) {
        let quantity = insideBags[j].split(' ')[1];
        let bagType2 = insideBags[j].split(' ')[2] + ' ' + insideBags[j].split(' ')[3];
        if (bagType2 !== 'other bags.') {
          let times = 0;
          while (times < quantity) {
            bagObj[bagType].push(bagType2);
            times++;
          }
        }
      }
    }
  }
  return bagObj;
}

const getAllChildren = tree => {
  let children = [];
  for (let key in tree) {
    if (tree.hasOwnProperty(key)) {
      for (let i = 0; i < tree[key].length; i++) {
        if (!children.includes(tree[key][i])) {
          children.push(tree[key][i]);
        }
      }
    }
  }
  return children;
}

const countParents = (tree, target, options) => {
  if (!getAllChildren(tree).includes(target)) {
    console.log((options.filter((v, i, s) => s.indexOf(v) === i)).length);
    return (options.filter((v, i, s) => s.indexOf(v) === i)).length;
  } else {
    for (let key in tree) {
      if (tree.hasOwnProperty(key)) {
        if (tree[key].includes(target)) {
          options.push(key);
          options.concat(countParents(tree, key, options));
        }
      }
    }
  }
}

let count = 0;
const countChildren = (tree, target) => {
  if (!tree[target].length) {
    return 0;
  } else {
    count += tree[target].length;
    for (let i = 0; i < tree[target].length; i++) {
      countChildren(tree, tree[target][i]);
    }
  }
  console.log('count:', count);
}

buildTree().then(res => countParents(res, 'shiny gold', []));
buildTree().then(res => countChildren(res, 'shiny gold'));
