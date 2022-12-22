const helpers = require('./../helpers')
const input = helpers.fetchInput('2022', 'Day13', '\n\n').map(row => row.split('\n').map((x) => JSON.parse(x)))

const rightOrder = (left, right) => {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
        if (!left[i]) return true
        if (!right[i]) return false

        // 2 integers
        if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
            if (left[i] < right[i]) return true
            if (left[i] > right[i]) return false
            else continue
        }

        // 1 array, 1 non-array
        if (Array.isArray(left[i]) && Number.isInteger(right[i])) {
            return rightOrder(left[i], [right[i]])
        } else if (Number.isInteger(left[i]) && Array.isArray(right[i])) {
            return rightOrder([left[i]], right[i])
        }

        // 2 arrays
        else {
            let result = rightOrder(left[i], right[i])
            if (result !== null) return result
        }
    }
    return null
}

const checkPackets = input => {
    let sum = 0
    for (let i = 0; i < input.length; i++) {
        let [p1, p2] = input[i]
        sum = rightOrder(p1, p2) ? sum += i + 1 : sum
    }
    console.log('part 1 solution', sum)

    let d1 = [[2]]
    let d2 = [[6]]
    let sorted = [...input.flat(), d1, d2]

    sorted.sort((p1, p2) => {
        let correct = rightOrder(p1, p2)
        if (correct) return -1
        if (!correct) return 1
        return 0
    })
    console.log('part 2 solution', (sorted.indexOf(d1) + 1) * (sorted.indexOf(d2) + 1))

}

checkPackets(input)