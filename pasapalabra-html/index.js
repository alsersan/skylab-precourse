const question = document.querySelector('.question');
document.querySelector('.play__button').addEventListener('click', startGame);
document.getElementById('user-input').addEventListener('submit', handleSubmit);
document.querySelector('.pasapalabra').addEventListener('click', handlePasapalabra);
document.querySelector('.end-button').addEventListener('click', endGame);

const numOfQuestions = 25;
const initialTime = 150;
let timeLeft = initialTime;
let index = 0;
let unanswered = numOfQuestions;
let correct = 0;
let incorrect = 0;

let questions = createQuestions();
let questionSet;
let timerID;

function startGame() {
  questionSet = Math.floor(Math.random() * (2 + 1));
  document.querySelector('.play').classList.add('move-up');
  setTimeout(() => {
    timerID = startTimer();
    askQuestion();
  }, 1000);
}

function handleSubmit(e) {
  e.preventDefault();
  const textField = e.target[0];
  const answer = removeAccents(textField.value).trim().toLowerCase();
  if (answer === questions[index].questions[questionSet].answer) {
    updateResults('correct');
    modifyCircle('correct');
  } else {
    updateResults('incorrect');
    modifyCircle('incorrect');
  }
  textField.value = '';
  increaseIndex();
  askQuestion();
}

function handlePasapalabra() {
  modifyCircle('remove');
  increaseIndex();
  askQuestion();
}

function askQuestion() {
  if (unanswered === 0) {
    endGame();
    return;
  }
  if (questions[index].status !== 0) {
    increaseIndex();
    askQuestion();
    return;
  }
  modifyCircle('active');
  question.innerText = questions[index].questions[questionSet].question;
}

function updateResults(status) {
  if (status === 'correct') {
    questions[index].status = 1;
    correct++;
    unanswered--;
    document.querySelector('.correct__text').innerText = correct;
  } else if (status === 'incorrect') {
    questions[index].status = 2;
    incorrect++;
    unanswered--;
    document.querySelector('.incorrect__text').innerText = incorrect;
  }
}

function increaseIndex() {
  index++;
  if (index > numOfQuestions - 1) index = 0;
}

function removeAccents(text) {
  return text
    .normalize('NFD')
    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, '$1')
    .normalize();
}

function modifyCircle(status) {
  const letter = questions[index].letter;
  const el = document.querySelector(`.letter-${letter}`);
  el.className = `small-circle letter-${letter} ${
    status === 'remove' ? '' : `small-circle--${status}`
  }`;
  el.firstElementChild.className = `small-circle__text ${
    status === 'remove' ? '' : `small-circle__text--${status}`
  }`;
  // Add event listener when the letter is active to trigger the transition loop, and remove it when it's not
  if (status === 'active') {
    el.className = `small-circle letter-${letter} small-circle--active small-circle--active2`;
    el.addEventListener('transitionend', transitionLoop);
  } else {
    el.removeEventListener('transitionend', transitionLoop);
  }
}

function transitionLoop(e) {
  const el = e.target;
  if (el.classList.contains('small-circle--active2')) {
    el.classList.remove('small-circle--active2');
  } else {
    el.classList.add('small-circle--active2');
  }
}

function startTimer() {
  const timerNumber = document.querySelector('.timer__text');
  const timer = document.querySelector('.timer');
  const degreeIncrement = 360 / timeLeft;
  let degrees = 0;
  //Countdown each second and reduce the white part of the timer circle
  return setInterval(() => {
    timeLeft--;
    degrees += degreeIncrement;
    timerNumber.innerText = timeLeft;
    timer.style.background = `conic-gradient(white 0deg ${degrees}deg, #0067df ${degrees}deg 360deg)`;
    if (timeLeft === 0) stopTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerID);
}

function endGame() {
  stopTimer();
  document.querySelector('.end-screen').classList.add('move-down');
  const string1 = correct === 1 ? 'respuesta correcta' : 'respuestas correctas';
  const string2 = incorrect === 1 ? 'respuesta incorrecta' : 'respuestas incorrectas';
  const string3 = unanswered === 1 ? 'pregunta' : 'preguntas';
  document.querySelector('.end-content__score').innerText = `
    Tienes${
      unanswered > 0 ? ` ${unanswered} ${string3} sin responder,` : ''
    } ${correct} ${string1} y ${incorrect} ${string2}.`;

  document.querySelector('.no-repeat').addEventListener('click', () => location.reload());
  document.querySelector('.repeat').addEventListener('click', newGame);
}

function newGame() {
  // Reset counters
  timeLeft = initialTime;
  correct = 0;
  incorrect = 0;
  unanswered = numOfQuestions;
  questions = createQuestions();
  //Remove end screen
  document.querySelector('.end-screen').classList.remove('move-down');
  // Reset everything to its initial state
  document.querySelector('.correct__text').innerText = '0';
  document.querySelector('.incorrect__text').innerText = '0';
  document.querySelector('.timer__text').innerText = initialTime;
  document.querySelector('.user-input__field').value = '';
  document.querySelector('.timer').style.background = 'conic-gradient(#0067df 0deg 360deg)';
  question.innerText = '';
  // Reset the circles to the unanswered state
  for (let i = 0; i < numOfQuestions; i++) {
    index = i;
    modifyCircle('remove');
  }
  index = 0;
  // Start the game
  startGame();
}

// Status 0 = not answered; status 1 = answered correctly; status 2: answered incorrectly
function createQuestions() {
  return [
    {
      letter: 'a',
      status: 0,
      questions: [
        {
          question:
            'CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien.',
          answer: 'abducir',
        },
        {
          question: "CON LA A. Leg??timo Rey de Gondor en 'El se??or de los anillos'.",
          answer: 'aragorn',
        },
        {
          question:
            'CON LA A. Persona que se encarga del cumplimiento de las reglas en algunos deportes.',
          answer: 'arbitro',
        },
      ],
    },
    {
      letter: 'b',
      status: 0,
      questions: [
        {
          question:
            "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso.",
          answer: 'bingo',
        },
        {
          question:
            'CON LA B. Diosa egipcia de la protecci??n, amor y armon??a. Su cabeza tiene forma de gato.',
          answer: 'bastet',
        },
        {
          question: 'CON LA B. Mam??fero acu??tico de gran tama??o.',
          answer: 'ballena',
        },
      ],
    },
    {
      letter: 'c',
      status: 0,
      questions: [
        { question: 'CON LA C. Ni??o, cr??o, beb??.', answer: 'churumbel' },
        {
          question: "CON LA C. De las novelas 'Canci??n de hielo y fuego', 'Las lluvias de...'.",
          answer: 'castamere',
        },
        {
          question:
            'CON LA C. Autom??vil destinado al transporte de personas y con capacidad no superior a siete plazas.',
          answer: 'coche',
        },
      ],
    },
    {
      letter: 'd',
      status: 0,
      questions: [
        {
          question:
            'CON LA D. Anormalidad en la funci??n del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia l??quida.',
          answer: 'diarrea',
        },
        {
          question:
            'CON LA D. Reptil f??sil, propio del Mesozoico, generalmente de gran tama??o, cabeza peque??a, cuello largo, cola robusta y larga, y extremidades posteriores m??s largas que las anteriores.',
          answer: 'dinosaurio',
        },
        {
          question: 'CON LA D. Romper, hacer a??icos.',
          answer: 'destrozar',
        },
      ],
    },
    {
      letter: 'e',
      status: 0,
      questions: [
        {
          question:
            'CON LA E. Afecci??n cut??nea caracterizada por ves??culas rojizas y exudativas, que dan lugar a costras y escamas.',
          answer: 'eccema',
        },
        {
          question: 'CON LA E. Idioma universal artificial creado por el polaco L. L. Zamenhof.',
          answer: 'esperanto',
        },
        {
          question:
            'CON LA E. Jefe supremo del antiguo Imperio romano, y que originariamente se nombraba por aclamaci??n del Ej??rcito o decreto del Senado.',
          answer: 'emperador',
        },
      ],
    },
    {
      letter: 'f',
      status: 0,
      questions: [
        {
          question: 'CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad.',
          answer: 'facil',
        },
        {
          question: 'CON LA F. Genero literario donde aparecen caballeros, dragones y magia.',
          answer: 'fantasia',
        },
        {
          question:
            'CON LA F. Cada uno de los antiguos reyes de Egipto anteriores a la conquista de este pa??s por los persas.',
          answer: 'faraon',
        },
      ],
    },
    {
      letter: 'g',
      status: 0,
      questions: [
        {
          question:
            'CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y part??culas.',
          answer: 'galaxia',
        },
        {
          question:
            "CON LA G. T??tulo original en Espa??a de la aclamada pel??cula de ciencia ficci??n. 'La guerra de las...'.",
          answer: 'galaxias',
        },
        {
          question: 'CON LA G. Educado, de buenas maneras.',
          answer: 'gentil',
        },
      ],
    },
    {
      letter: 'h',
      status: 0,
      questions: [
        {
          question:
            'CON LA H. Forma de suicidio ritual, practicado en el Jap??n por razones de honor o por orden superior, consistente en abrirse el vientre.',
          answer: 'harakiri',
        },
        {
          question: 'CON LA H. Herir el amor propio o la dignidad de alguien.',
          answer: 'humillar',
        },
        {
          question:
            'CON LA H. Agua convertida en cuerpo s??lido y cristalino por un descenso suficiente de temperatura.',
          answer: 'hielo',
        },
      ],
    },
    {
      letter: 'i',
      status: 0,
      questions: [
        {
          question: 'CON LA I. Templo cristiano.',
          answer: 'iglesia',
        },
        {
          question: "CON LA I. Pa??s-Ciudad controlada por Saruman en 'El se??or de los anillos'.",
          answer: 'isengard',
        },
        {
          question:
            'CON LA I. Cambiar, sustituy??ndolos por sus contrarios, la posici??n, el orden o el sentido de las cosas.',
          answer: 'invertir',
        },
      ],
    },
    {
      letter: 'j',
      status: 0,
      questions: [
        {
          question:
            "CON LA J. Variedad salvaje del cerdo que sale en la pel??cula 'El Rey Le??n', de nombre Pumba.",
          answer: 'jabali',
        },

        {
          question: 'CON LA J. Preparado farmac??utico l??quido que se administra por la boca.',
          answer: 'jarabe',
        },
        {
          question: 'CONTIENE LA J. Actividad intensa que implica movimientos incesantes.',
          answer: 'ajetreo',
        },
      ],
    },
    {
      letter: 'l',
      status: 0,
      questions: [
        {
          question: 'CON LA L. ??nico sat??lite natural de la Tierra.',
          answer: 'luna',
        },
        {
          question:
            'CON LA L. Persona que, seg??n la tradici??n popular, se convierte en lobo las noches de plenilunio.',
          answer: 'licantropo',
        },
        {
          question: 'CON LA L. Que ha perdido la raz??n.',
          answer: 'loco',
        },
      ],
    },
    {
      letter: 'm',
      status: 0,
      questions: [
        {
          question:
            'CON LA M. Persona que huye del trato con otras personas o siente gran aversi??n hacia ellas.',
          answer: 'misantropo',
        },
        {
          question:
            'CON LA M. Figura decorativa tallada en madera situada en la proa de antiguos buques.',
          answer: 'mascaron',
        },
        {
          question:
            'CON LA M. Parte del d??a comprendida entre el amanecer y el mediod??a, o la hora de comer o almorzar.',
          answer: 'ma??ana',
        },
      ],
    },
    {
      letter: 'n',
      status: 0,
      questions: [
        {
          question: 'CON LA N. Demostraci??n de poca inteligencia.',
          answer: 'necedad',
        },
        {
          question: 'CON LA N. Mago especializado en magia negra y resucitar muertos.',
          answer: 'nigromante',
        },
        {
          question:
            'CON LA N. Sustancia blanca formada por la precipitaci??n de agua a bajas temperaturas.',
          answer: 'nieve',
        },
      ],
    },
    {
      letter: '??',
      status: 0,
      questions: [
        {
          question:
            'CONTIENE LA ??. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.',
          answer: 'se??al',
        },
        {
          question: 'CON LA ??. Ant??lope sudafricano.',
          answer: '??u',
        },
        {
          question: 'CONTIENE LA ??: Golpe que se da con el pu??o de la mano.',
          answer: 'pu??etazo',
        },
      ],
    },
    {
      letter: 'o',
      status: 0,
      questions: [
        {
          question: 'CON LA O. ??rgano externo de la audici??n.',
          answer: 'oreja',
        },

        {
          question: 'CON LA O. Onda de gran amplitud que se forma en la superficie de las aguas.',
          answer: 'ola',
        },
        {
          question: 'CON LA O. Adorno, compostura, atav??o que hace vistosa una cosa.',
          answer: 'ornamento',
        },
      ],
    },
    {
      letter: 'p',
      status: 0,
      questions: [
        {
          question:
            'CON LA P. Raza ancestral tecnol??gicamente avanzada que se caracteriza por sus grandes poderes psi??nicos del videojuego StarCraft.',
          answer: 'protoss',
        },
        {
          question: 'CON LA P: Que se repite con frecuencia a intervalos determinados.',
          answer: 'periodico',
        },
        {
          question:
            'CON LA P. Utensilio de hierro en forma de rejilla para poner al fuego lo que se ha de asar o tostar.',
          answer: 'parrilla',
        },
      ],
    },
    {
      letter: 'q',
      status: 0,
      questions: [
        {
          question: 'CON LA Q. Producto obtenido por la maduraci??n de la cuajada de la leche',
          answer: 'queso',
        },
        {
          question:
            'CON LA Q. Piezas bucales presentes en un subfilo de artr??podos como los ar??cnidos.',
          answer: 'queliceros',
        },
        { question: 'CON LA Q. Destruir algo o a alguien con fuego.', answer: 'quemar' },
      ],
    },
    {
      letter: 'r',
      status: 0,
      questions: [
        {
          question: "CON LA R. Ciudad ??lfica gobernada por Elrond en 'El se??or de los anillos'.",
          answer: 'rivendel',
        },
        {
          question:
            'CON LA R. Mam??fero roedor de peque??o tama??o, de hocico puntiagudo y cola larga, de pelaje corto.',
          answer: 'raton',
        },
        {
          question:
            'CON LA R. Corriente de agua continua y m??s o menos caudalosa que va a desembocar en otra, en un lago o en el mar.',
          answer: 'rio',
        },
      ],
    },
    {
      letter: 's',
      status: 0,
      questions: [
        {
          question: 'CON LA S. Comunidad salvadora de todo desarrollador inform??tico.',
          answer: 'stackoverflow',
        },

        {
          question: 'CON LA S. Baile t??pico de brasil.',
          answer: 'samba',
        },
        {
          question: 'CON LA S. Representarse en la fantas??a im??genes o sucesos mientras se duerme.',
          answer: 'so??ar',
        },
      ],
    },
    {
      letter: 't',
      status: 0,
      questions: [
        {
          question:
            'CON LA T. Pel??cula del director James Cameron que consolid?? a Arnold Schwarzenegger como actor en 1984.',
          answer: 'terminator',
        },
        {
          question:
            'CON LA T. Alimento preparado con huevo batido, cuajado con aceite en la sart??n y de forma redonda o alargada, al que a veces se a??aden otros ingredientes.',
          answer: 'tortilla',
        },
        {
          question:
            'CON LA T. Grave dolor f??sico o psicol??gico infligido a alguien, con m??todos y utensilios diversos, con el fin de obtener de ??l una confesi??n, o como medio de castigo.',
          answer: 'tortura',
        },
      ],
    },
    {
      letter: 'u',
      status: 0,
      questions: [
        {
          question:
            "CON LA U. Escritor y fil??sofo espa??ol de la generaci??n del 98 autor del libro 'Niebla' en 1914.",
          answer: 'unamuno',
        },
        {
          question: 'CON LA U. Instrumento de cuerda similar a la guitarra pero m??s peque??o.',
          answer: 'ukelele',
        },
        {
          question: 'CON LA U. Objeto fabricado que se destina a un uso manual y dom??stico.',
          answer: 'utensilio',
        },
      ],
    },
    {
      letter: 'v',
      status: 0,
      questions: [
        {
          question:
            'CON LA V. Nombre dado a los miembros de los pueblos n??rdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa.',
          answer: 'vikingos',
        },
        {
          question:
            'CON LA V. Traspasar a alguien por el precio convenido la propiedad de lo que se posee.',
          answer: 'vender',
        },
        {
          question: 'CON LA V. Hortaliza, especialmente la de hojas verdes.',
          answer: 'verdura',
        },
      ],
    },
    {
      letter: 'x',
      status: 0,
      questions: [
        {
          question: 'CONTIENE LA X. Toxina bacteriana utilizada en ciruj??a est??tica.',
          answer: 'botox',
        },
        {
          question:
            'CON LA X. Instrumento musical de percusi??n formado por l??minas generalmente de madera, ordenadas horizontalmente seg??n su tama??o y sonido, que se hacen sonar golpe??ndolas con dos baquetas.',
          answer: 'xilofono',
        },
        {
          question: 'CON LA X. Fobia a los extranjeros.',
          answer: 'xenofobia',
        },
      ],
    },
    {
      letter: 'y',
      status: 0,
      questions: [
        {
          question:
            'CONTIENE LA Y. Planta cact??cea, de peque??o tama??o, que contiene una sustancia cuya ingesti??n produce efectos alucin??genos y narc??ticos.',
          answer: 'peyote',
        },
        {
          question:
            'CONTIENE LA Y. Abominable hombre de las nieves. Supuesto gigante antropomorfo, del cual se dice que vive en el Himalaya.',
          answer: 'yeti',
        },
        {
          question:
            'CONTIENE LA Y. Pieza de la armadura antigua que resguardaba la cabeza y el rostro, y se compon??a de morri??n, visera y babera.',
          answer: 'yelmo',
        },
      ],
    },
    {
      letter: 'z',
      status: 0,
      questions: [
        {
          question:
            'CON LA Z. Escuela de budismo que busca la experiencia de la sabidur??a m??s all?? del discurso racional.',
          answer: 'zen',
        },
        {
          question: 'CON LA Z. Zapato de madera de una pieza.',
          answer: 'zueco',
        },
        {
          question:
            'CON LA Z. Calzado que no pasa del tobillo, con la parte inferior de suela y lo dem??s de piel, fieltro, pa??o u otro tejido, m??s o menos escotado por el empeine.',
          answer: 'zapato',
        },
      ],
    },
  ];
}
