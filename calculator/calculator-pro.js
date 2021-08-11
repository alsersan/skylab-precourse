function main() {
  let calculateAgain = true;

  do {
    const inputNums = [];
    askInputRepeteadly(inputNums);
    calculator(inputNums);
    calculateAgain = confirm('Would you like to do another calculation?');
  } while (calculateAgain === true);

  function askInputRepeteadly(inputArray) {
    let i = 1;
    let ask = true;
    do {
      ask = askInput(i);
      i++;
    } while (ask === true);

    function askInput(index) {
      let askAgain = true;
      const input = prompt(
        `Please enter number ${index}, or press Cancel to start the calculation`
      );
      const valid = /^-?\d+\.?\d*$/.test(input);
      if (!valid && input !== null) {
        const repeat = confirm('The input can only contain numbers. Would you like to try again?');
        if (repeat) askAgain = askInput(index);
        if (!repeat) askAgain = false;
      }
      if (input === null) askAgain = false;
      if (valid) inputArray.push(parseFloat(input));
      return askAgain;
    }
  }

  function calculator(inputArray) {
    if (inputArray.length === 0) {
      alert("You didn't enter any valid input!");
    } else if (inputArray.length === 1) {
      alert(`
        Your input was ${inputArray[0]}
        - The result of the square root is ${sqrRoot(...inputArray)}
        `);
    } else {
      alert(`
        Your input was ${inputArray
          .slice(0, inputArray.length - 1)
          .toString()
          .replaceAll(',', ', ')} and ${inputArray[inputArray.length - 1]}
        - The result of the addition is ${add(inputArray)}
        - The result of the substraction is ${substract(inputArray)}
        - The result of the multiplication is ${multiply(inputArray)}
        - The result of the division is ${divide(inputArray)}
      `);
    }
  }

  function add(inputArray) {
    const result = inputArray.reduce((acc, num) => acc + num);
    return checkDecimals(result);
  }

  function substract(inputArray) {
    const result = inputArray.reduce((acc, num) => acc - num);
    return checkDecimals(result);
  }

  function multiply(inputArray) {
    const result = inputArray.reduce((acc, num) => acc * num);
    return checkDecimals(result);
  }

  function divide(inputArray) {
    const result = inputArray.reduce((acc, num) => acc / num);
    return checkDecimals(result);
  }

  function sqrRoot(num) {
    const result = Math.sqrt(num);
    return checkDecimals(result);
  }

  function checkDecimals(expression) {
    const decimals = expression.toString().split('.');
    if (decimals[1]) return expression.toFixed(3);
    return expression;
  }
}
main();
