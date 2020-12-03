const { day2 } = require('./intCodeInputs.js');

describe('intcode computer', function() {
  const { Computer } = require('./intCode');

  it('outputs the correct final state given day 2 test cases', function() {
    let test1 = new Computer('1,0,0,0,99');
    test1.run();
    expect(test1.memory).toEqual([2, 0, 0, 0, 99]);

    let test2 = new Computer('2,3,0,3,99');
    test2.run();
    expect(test2.memory).toEqual([2, 3, 0, 6, 99]);

    let test3 = new Computer('2,4,4,5,99,0');
    test3.run();
    expect(test3.memory).toEqual([2, 4, 4, 5, 99, 9801]);

    let test4 = new Computer('1,1,1,4,99,5,6,0,99');
    test4.run();
    expect(test4.memory).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);

    let test5 = new Computer('1,9,10,3,2,3,11,0,99,30,40,50');
    test5.run();
    expect(test5.memory).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  })

  it('outputs correct final state position 0 given day 2 puzzle input', function() {
    let test6 = new Computer(day2);
    test6.run({1: 12, 2: 2});
    expect(test6.getAddress(0)).toEqual(3409710);
  })

})
