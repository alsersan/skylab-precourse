document.querySelector('.button-container').addEventListener('click', onClick);
const operation = document.querySelector('.display__operation');
const result = document.querySelector('.display__result');

let expression = '';
function onClick(e) {
  // don't operate on the previous result if the expression is empty or if a number btn or delete btn is pressed
  if (!expression && !e.target.innerText.match(/\d|\u27f2/)) expression += result.innerText;
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
      // Replace the expression with the correct operators
      expression = expression
        .replace(/x/g, '*')
        .replace(/\u00f7/g, '/')
        .replace(/\u00b2/g, '**2')
        .replace(/\u00b3/g, '**3');
      try {
        const finalResult = eval(expression);
        result.innerText = finalResult;
      } catch (e) {
        alert('Invalid expression');
      }
      expression = addText('', '');
      break;
    case 'squared':
      expression = addText('\u00b2', expression);
      break;
    case 'cubed':
      expression = addText('\u00b3', expression);
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
