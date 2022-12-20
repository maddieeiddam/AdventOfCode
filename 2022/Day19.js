const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day19', '\n').map(x => {
    return {
        geode: {
            ore: Number(x.split('geode robot costs ')[1].split(' ')[0]),
            obsidian: Number(x.split('geode robot costs ')[1].split(' ')[3])
        },
        obsidian: {
            ore: Number(x.split('obsidian robot costs ')[1].split(' ')[0]),
            clay: Number(x.split('and ')[1].split(' ')[0])
        },
        clay: {
            ore: Number(x.split('clay robot costs ')[1].split(' ')[0]),
            clay: 0
        },
        ore: {
            ore: Number(x.split('ore robot costs ')[1].split(' ')[0]),
            clay: 0
        }
    }
})

const canBuild = (robot, supplies) => {
    if (robot.ore <= supplies.ore && robot.clay <= supplies.clay) return true
    return false
}

// incomplete - suspect I need to use linear programming to optimize geodes
const parseBlueprints = input => {
    for (let i = 0; i < input.length; i++) {
        let robots = { ore: 1, clay: 0, obsidian: 0, geode: 0 }
        let supplies = { ore: 0, clay: 0, obsidian: 0, geode: 0}
        let min = 1
        let building = []
        while (min <= 24) {
            console.log('minute', min)
            // add robots that are done building
            building.forEach(bot => robots[bot]++)
            console.log('robots:', robots)
            building = []
            // build new robots
            for (let key in input[i]) {
                if (canBuild(input[i][key], supplies)) {
                    console.log('building', key, 'robot')
                    supplies.ore -= input[i][key].ore
                    supplies.clay -= input[i][key].clay
                    building.push(key)
                }
            }
            // collect materials
            for (let key in robots) {
                if (robots[key] > 0) {
                    supplies[key] += robots[key]
                }
            }
            console.log('supplies', supplies)
            min++
        }
    }
}

parseBlueprints(input)