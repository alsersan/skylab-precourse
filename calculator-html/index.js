document.querySelector('.button-container').addEventListener('click', onClick);
const operation = document.querySelector('.display__operation');
const result = document.querySelector('.display__result');

let expression = '';
function onClick(e) {
  if (!expression && e.target.innerText !== /d/) expression += result.innerText;
  console.log(e);
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
      expression = expression
        .replace(/x/g, '*')
        .replace(/\u00f7/g, '/')
        .replace(/\u00b2/g, '**2')
        .replace(/\u00b3/g, '**3');
      console.log(expression);
      try {
        const finalResult = eval(`${expression}`);
        console.log(result);
        result.innerText = finalResult;
      } catch (e) {
        console.log(e);
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
      console.log(expression);
  }
}

function addText(newChar, text) {
  const newText = text + newChar;
  operation.innerText = newText;
  return newText;
}