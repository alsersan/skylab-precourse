document.querySelector('.button-container').addEventListener('click', onClick);
const operation = document.querySelector('.display__operation');
const result = document.querySelector('.display__result');

let expression = '';
function onClick(e) {
  // don't operate on the previous result if the expression is empty or if number, delete, Ans, sqrRoot or parenthesis is pressed
  if (!expression && !/\d|\u27f2|\u221a|\(|\)|Ans/.test(e.target.innerText))
    if (!(result.innerText === '0' && /-/.test(e.target.innerText))) {
      // For the - sign, only operate on previous results if the result is not 0
      expression += result.innerText;
    }
  switch (e.target.id) {
    case 'reset':
      expression = addText('', '');
      result.innerText = '0';
      break;
    case 'delete':
      expression = expression.slice(0, -1);
      operation.innerText = expression;
      break;
    case 'equal':
      expression = replaceOperators(expression);
      if (/\u221a/.test(expression)) expression = parseSqrRoot(expression);
      console.log(expression);
      expression = calculateResult(expression);
      break;
    case 'squared':
      expression = addText('\u00b2', expression);
      break;
    case 'answer':
      expression = addText(result.innerText, expression);
      break;
    default:
      expression = addText(e.target.innerText, expression);
  }
}

function addText(newChar, text) {
  const newText = text + newChar;
  operation.innerText = newText;
  return newText;
}

function replaceOperators(expression) {
  return expression
    .replace(/x/g, '*')
    .replace(/\u00f7/g, '/')
    .replace(/\u00b2/g, '**2')
    .replace(/\u221E/g, 'Infinity');
}

function calculateResult(expression) {
  try {
    const finalResult = eval(expression).toString().replace('Infinity', '\u221E');
    // If result is too long to fit, display it in scientific notation
    if (finalResult.length > 16) {
      result.innerText = parseFloat(finalResult).toExponential(6);
    } else {
      result.innerText = finalResult;
    }
    expression = '';
  } catch (e) {
    console.error(e);
    alert(`Invalid expression\n\nError message: ${e}`);
    expression = addText('', '');
  }
  return expression;
}

// The functions below are necessary to calculate square roots
// Square roots are written as √x by the user, but the content (x) needs to be inverted to be able to calculate it as x**0.5 by eval
function parseSqrRoot(expression) {
  const sqrRootIndices = [];
  for (let i = 0; i < expression.length; i++) {
    // u221a = square root symbol
    // Use unshift to start modifying the expression from the back, keeping the previous indices intact
    if (/\u221a/.test(expression[i])) sqrRootIndices.unshift(i);
  }
  let newExpression = expression;
  sqrRootIndices.forEach((index) => {
    const next = index + 1;
    let lastIndex;
    if (newExpression[next] === '(') {
      lastIndex = findClosingParenthesisIndex(newExpression, next);
    } else if (/\d|-/.test(newExpression[next])) {
      lastIndex = findLastConsecutiveNumericCharacterIndex(newExpression, next);
    }
    if (lastIndex) {
      // Square root encapsulated in parentheses to avoid unwanted behavior
      newExpression =
        newExpression.slice(0, index) +
        '(' +
        newExpression.slice(next, lastIndex + 1) +
        '**0.5)' +
        newExpression.slice(lastIndex + 1);
    } else if (lastIndex === null) {
      // Closing parenthesis has not been found, so it is added artificially
      newExpression = newExpression.slice(0, index) + '(' + newExpression.slice(next) + ')**0.5)';
    } else {
      // Square root symbol alone, with no content
      newExpression = newExpression.replace(/\u221a/g, '**0.5');
    }
  });
  return newExpression;
}

function findClosingParenthesisIndex(str, pos) {
  let level = 1;
  for (let i = pos + 1; i < str.length; i++) {
    if (str[i] === '(') level++;
    if (str[i] === ')') level--;
    if (level === 0) return i;
  }
  return null;
}

function findLastConsecutiveNumericCharacterIndex(str, pos) {
  for (let i = pos + 1; i < str.length; i++) {
    if (!/\d/.test(str[i])) return i - 1;
  }
  return str.length - 1;
}
