const helpers = require('./../helpers');
const PriorityQueue = require('priorityqueuejs')
const input = helpers.fetchInput('2021', 'Day15', '\n').map((x => [...x].map(Number)));

// returns the cost of an individual position
function getCost(map, pos) {
	const [X, Y] = helpers.getGridSize(map);
	const [x, y] = helpers.parseCoord(pos);
	const cost = map[y % Y][x % X] + Math.floor(y / Y) + Math.floor(x / X);
	return cost % 10 + Math.floor(cost / 10);
}

const findBestPath = (arr, repeat) => {
	const queue = new PriorityQueue((a, b) => b.cost - a.cost);
	const prevPoint = {};
	const costs = { '0,0': 0 };
	const visited = {};

	queue.enq({pos: '0,0', cost: 0});

	while (!queue.isEmpty()) {
		const cur = queue.deq().pos;

		if (!visited[cur]) {
			let [x, y] = helpers.parseCoord(cur)
			let adj = helpers.getAdjacent(arr, repeat, x, y).map(xy => xy.join(','))
			for (const next of adj) {
				const newCost = costs[cur] + getCost(arr, next);
				if (!costs[next] || costs[next] > newCost) {
					queue.enq({cost: newCost, pos: next});
					costs[next] = newCost;
					prevPoint[next] = cur;
				}
			}
			visited[cur] = true;
		}
	}

	const [X, Y] = helpers.getGridSize(arr, repeat);
	let pos = [X - 1, Y - 1].join(',');

	let totalRisk = 0;

	while (pos !== '0,0') {
		totalRisk += getCost(arr, pos)
		pos = prevPoint[pos];
	}

	console.log('total risk:', totalRisk);
}

findBestPath(input, 1);
