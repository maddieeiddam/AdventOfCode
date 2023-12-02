const helpers = require('./../helpers')
const input = helpers.fetchInput('2023', 'Day1', '\n', 'str', true)

const numMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }

const parseCalibration = input => {
    let sum = 0
    const strings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const regex = /(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/g
    for (let i = 0; i < input.length; i++) {
        let digits = [...input[i].matchAll(regex)].map(n => n[1]).map(n => isNaN(parseInt(n)) ? n : parseInt(n))

        let tens = (typeof(digits[0]) === 'string' ? strings.indexOf(digits[0]) + 1 : digits[0]) * 10
        let ones = typeof(digits[digits.length - 1]) === 'string' ? strings.indexOf(digits[digits.length - 1]) + 1 : digits[digits.length - 1]
        sum += tens + ones
    }
    return sum
}

console.log(parseCalibration(input))