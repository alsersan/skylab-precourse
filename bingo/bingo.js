function bingo() {
  // const username = prompt(`What's your name?`);
  let cardNumbers;
  let satisfied = false;
  do {
    cardNumbers = generateCardNumbers();
    showCard(cardNumbers);
    satisfied = confirm(
      `Do you want to play with this card? Press 'OK' to continue or 'Cancel' to generate another one`
    );
  } while (!satisfied);
  const calledNumbers = [];
  const lineBingo = {
    oneLineBingo: false,
    twoLineBingo: false,
  };
  let newTurn = true;

  do {
    const ballNumber = generateBallNumber(calledNumbers);
    console.log(ballNumber);
    const numIndex = cardNumbers.indexOf(ballNumber);
    if (numIndex !== -1) {
      cardNumbers[numIndex] += ballNumber > 9 ? '       X' : '         X';
      showCard(cardNumbers);
    }
    newTurn = checkWinner(cardNumbers, lineBingo);
  } while (newTurn);
  const playAgain = confirm('Do you want to play again?');
  if (playAgain) {
    console.clear();
    bingo();
  }
}
bingo();

function checkWinner(numbers, lineBingo) {
  const card = [numbers.slice(0, 5), numbers.slice(5, 10), numbers.slice(10, 15)];
  let fullLines = 0;
  card.forEach((line) => {
    let counter = 0;
    line.forEach((number) => {
      if (typeof number === 'string') counter++;
    });
    if (counter === 5) fullLines++;
  });
  if (fullLines === 1 && !lineBingo.oneLineBingo) {
    alert('You have a One-Line Bingo!');
    lineBingo.oneLineBingo = true;
  }
  if (fullLines === 2 && !lineBingo.twoLineBingo) {
    alert('You have a Two-Line Bingo!');
    lineBingo.twoLineBingo = true;
  }
  if (fullLines === 3) {
    alert('You have a Full House Bingo!');
    return null;
  }
  return confirm('Do you want to pick another number?');
}

function generateCardNumbers() {
  let nums = new Set();
  while (nums.size < 15) {
    nums.add(Math.floor(Math.random() * (90 - 1) + 1));
  }
  return [...nums];
}

function generateBallNumber(calledNumbers) {
  const newNum = Math.floor(Math.random() * (90 - 1) + 1);
  if (calledNumbers.includes(newNum)) {
    return generateBallNumber(calledNumbers);
  } else {
    calledNumbers.push(newNum);
    return newNum;
  }
}

function showCard(numbers) {
  console.table([numbers.slice(0, 5), numbers.slice(5, 10), numbers.slice(10, 15)]);
}
