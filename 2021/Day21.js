class Player {
  constructor(startPos) {
    this.pos = startPos;
    this.score = 0;
    this.won = false;
  }

  takeTurn(die) {
    let sum = 0
    for (let i = 0; i < 3; i++) {
      sum += die.rollDie()
      die.rolls++
    }
    this.pos = ((this.pos + sum) % 10 === 0) ? 10 : (this.pos + sum) % 10
    this.score += this.pos
    this.won = this.score >= 1000
  }
}

class DeterministicDie {
  constructor() {
    this.next = 1;
    this.rolls = 0;
  }

  rollDie() {
    let roll = this.next
    this.next = (roll !== 100) ? this.next += 1 : 1
    return roll
  }
}

const playGame = (player1, player2, die) => {
  while (player1.score < 1000 && player2.score < 1000) {
    player1.takeTurn(die)
    if (!player1.won) {
      player2.takeTurn(die)
    }
  }
  let solution = player1.won ? player2.score * die.rolls : player1.score * die.rolls
  console.log('solution is', solution)
}

playGame(new Player(4), new Player(10), new DeterministicDie())
