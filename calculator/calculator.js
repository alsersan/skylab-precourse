function main() {
  let inputNums = [];

  askInput('Please enter number 1, or press Cancel');
  askInput('Please enter number 2, or press Cancel');
  calculator(inputNums);

  function askInput(question) {
    const input = prompt(question);
    const valid = /^-?\d+\.?\d*$/.test(input);
    if (!valid && input !== null) {
      const repeat = confirm(
        'The input can only contain numbers. Make sure to use a decimal point separator (.) and not a comma (,). Would you like to try again?'
      );
      if (repeat) askInput(question);
    }
    if (valid) inputNums.push(parseFloat(input));
  }

  function calculator(inputArray) {
    switch (inputArray.length) {
      case 1:
        alert(`
        Your input was ${inputArray[0]}
        - The result of the square root is ${sqrRoot(...inputArray)}
        `);
        break;
      case 2:
        alert(`
          Your input was ${inputArray[0]} and ${inputArray[1]}
          - The result of the addition is ${add(...inputArray)}
          - The result of the substraction is ${substract(...inputArray)}
          - The result of the multiplication is ${multiply(...inputArray)}
          - The result of the division is ${divide(...inputArray)}
        `);
        break;
      default:
        alert("You didn't enter any valid input!");
    }
  }

  function add(num1, num2) {
    return checkDecimals(num1 + num2);
  }

  function substract(num1, num2) {
    return checkDecimals(num1 - num2);
  }

  function multiply(num1, num2) {
    return checkDecimals(num1 * num2);
  }

  function divide(num1, num2) {
    return checkDecimals(num1 / num2);
  }

  function sqrRoot(num) {
    return checkDecimals(Math.sqrt(num));
  }

  function checkDecimals(expression) {
    const decimals = expression.toString().split('.');
    if (decimals[1]) return expression.toFixed(3);
    return expression;
  }
}
main();
