document.querySelector('.button-container').addEventListener('click', onClick);
const operation = document.querySelector('.display__operation');
const finalResult = document.querySelector('.display__result');

let expression = '';
function onClick(e) {
  switch (e.target.id) {
    case 'equal':
      expression = expression
        .replace(/x/g, '*')
        .replace(/\u00f7/g, '/')
        .replace(/\u00b2/g, '**2');
      console.log(expression);
      try {
        const result = eval(`${expression}`);
        console.log(result);
        finalResult.innerText = result;
      } catch (e) {
        console.log(e);
      }
      break;
    case 'squared':
      expression = addText('\u00b2', expression);
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
