const fs = require('fs-extra');
const path = require('path');
const helpers = require('./../helpers')
const input = fs.readFileSync(path.join(__dirname, 'inputs', 'Day16.txt'), 'utf8')

const conversionDict = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
}

const literalVal = binary => {
    let i = 0
    let output = ''
    let lastBit = false
    while (i < binary.length - 5 && !lastBit) {
        lastBit = (binary.substring(i, i + 1) === 0) ? true : false
        let bits = binary.substring(i + 1, i + 5)
        output = output + bits
        i += 5
    }
    return output
}

const operator = binary => {
    const lengthID = binary.substring(0, 1)
    if (lengthID === '0') {
        let nextPacket = binary.substring(16, 16 + parseInt(binary.substring(1, 16), 2))
        console.log('next packet length', parseInt(binary.substring(1, 16), 2))
        console.log('next packet', nextPacket)
        return decode(nextPacket)
    } else if (lengthID === '1') {

    }
}

const decode = input => {
    const hex = helpers.convertStringWithDict(input, conversionDict)
    const version = parseInt(hex.slice(0, 3), 2)
    const typeID = parseInt(hex.slice(3, 6), 2)
    let binary = (typeID === 4) ? literalVal(hex.slice(6)) : operator(hex.slice(6))
    console.log('output', parseInt(binary, 2))
    return parseInt(binary, 2)
}

decode(input)

helpers.test('hex input is converted to binary', helpers.convertStringWithDict('D2FE28', conversionDict), '110100101111111000101000')
helpers.test('version extraction is correct', parseInt('110100101111111000101000'.slice(0, 3), 2), 6)
helpers.test('typeID extraction is correct', parseInt('110100101111111000101000'.slice(3, 6), 2), 4)
helpers.test('literal is parsed correctly', literalVal('101111111000101000'), '011111100101')
helpers.test('decode works for literal value', decode('D2FE28'), 2021)

helpers.test('operator is parsed correctly', operator('00000000000110111101000101001010010001001000000000'), 27)

helpers.test('literal packet', decode('D2FE28'), 2021)
helpers.test('operator packet', decode('38006F45291200'), 10)

