function bingo() {
  console.clear();
  const username = askName();
  printScoreSystem(username);

  const cardNumbers = generateCardNumbers();
  const calledNumbers = [];
  const winners = {
    oneLineBingo: false,
    twoLineBingo: false,
    fullHouseBingo: false,
  };
  let points = 100;
  let newTurn = true;

  do {
    const ballNumber = generateBallNumber(calledNumbers);
    console.log(ballNumber);
    const numIndex = cardNumbers.indexOf(ballNumber);
    if (numIndex !== -1) {
      cardNumbers[numIndex] += ballNumber > 9 ? '       X' : '         X';
      showCard(cardNumbers);
    }
    points += checkWinner(cardNumbers, winners);
    !winners.fullHouseBingo
      ? (newTurn = confirm('Do you want to pick another number?'))
      : (newTurn = false);
  } while (newTurn);
  if (winners.fullHouseBingo) {
    printFinalScore(username, points);
    const playAgain = confirm('Do you want to play again?');
    playAgain && bingo();
  }
}
bingo();

function checkWinner(numbers, winners) {
  const card = [numbers.slice(0, 5), numbers.slice(5, 10), numbers.slice(10, 15)];
  let fullLines = 0;
  // Each turn reduces 1 point from the score
  let points = -1;
  card.forEach((line) => {
    let counter = 0;
    line.forEach((number) => {
      if (typeof number === 'string') counter++;
    });
    if (counter === 5) fullLines++;
  });
  if (fullLines === 1 && !winners.oneLineBingo) {
    alert('You have a One-Line Bingo!');
    winners.oneLineBingo = true;
    points += 50;
  }
  if (fullLines === 2 && !winners.twoLineBingo) {
    alert('You have a Two-Line Bingo!');
    winners.twoLineBingo = true;
    points += 100;
  }
  if (fullLines === 3) {
    alert('You have a Full House Bingo!');
    winners.fullHouseBingo = true;
    points += 200;
  }
  return points;
}

function generateCardNumbers() {
  let nums = new Set();
  while (nums.size < 15) {
    nums.add(Math.floor(Math.random() * (90 - 1) + 1));
  }
  showCard([...nums]);
  const satisfied = confirm(
    `Do you want to play with this card? Press 'OK' to continue or 'Cancel' to generate another one`
  );
  if (!satisfied) return generateCardNumbers();
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

function askName() {
  const username = prompt(`What's your name?`)?.trim();
  return username ? username : 'guest';
}

function printScoreSystem(name) {
  alert(`
    Hello ${name}. Your initial score is 100.
    Your final score will be calculated based on these rules:

    Each turn: -1 point
    One-Line Bingo: 50 points
    Two Line Bingo: 100 points
    Full House Bingo: 200 points
  `);
}

function printFinalScore(username, points) {
  const dummyResults = [
    {
      username: 'Potatoman',
      points: 68,
    },
    {
      username: 'Da_best',
      points: 230,
    },
    {
      username: 'Eternal loser',
      points: 10,
    },
    {
      username,
      points,
    },
  ];
  let leaderboard = '';
  dummyResults
    .sort((a, b) => b.points - a.points)
    .forEach((result) => {
      leaderboard += `${result.username}: ${result.points} points \n`;
    });
  alert(`Leaderboard\n\n${leaderboard}`);
}
