const quizData = [
  {
    question: "Hvilket lag er verst i Overwatch 2",
    a: "Quick Esports",
    b: "Østfold Østers",
    c: "Funnyguys",
    d: "Vernalis Big",
    e: "Fritid Esport",
    correct: "b",
  },
  {
    question: "Hvilke Adobe-program er best",
    a: "Photoshop",
    b: "Illustrator",
    c: "Premiere Pro",
    d: "After Effects",
    e: "InDesign",
    correct: "c",
  },
  {
    question: "Hvem er den kuleste i Exit",
    a: "Jeppe",
    b: "Pål",
    c: "William",
    d: "Adam",
    e: "Henrik",
    correct: "c",
  },
  {
    question: "Hvor mange ganger har Adam banket kona si",
    a: "3",
    b: "6",
    c: "For mange",
    d: "Blir aldri ferdig",
    e: "23",
    correct: "d",
  },
  {
    question: "Hvor mange fracture cases hadde jeg på det meste",
    a: "32",
    b: "50",
    c: "Ett par",
    d: "78",
    e: "88",
    correct: "e",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const e_text = document.getElementById("e_text");
const submitBtn = document.getElementById("submit");
const audioFeil = [
  "Lyd og bilder/aughhhhh-aughhhhh.mp3",
  "Lyd og bilder/bing-chilling_fcdGgUc.mp3",
  "Lyd og bilder/boom.mp3",
  "Lyd og bilder/perfect-fart.mp3",
];

let audioRiktig = new Audio("Lyd og bilder/Yippee Original Sound Effect.mp3");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
  e_text.innerText = currentQuizData.e;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEls) => {
    if (answerEls.checked) {
      answer = answerEls.id;
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const random = Math.floor(Math.random() * audioFeil.length);
  let audioRandom = new Audio(audioFeil[random]);
  const answer = getSelected();

  //de trykka på submit
  if (answer) {
    //hvis svaret er ingenting
    document.querySelectorAll("input").forEach((element) => {
      element.setAttribute("disabled", true);

      if (element.id === quizData[currentQuiz].correct) {
        element.style.color = "red";
      } else {
        element.style.color = "#FF0000";
      }
    });

    document.querySelectorAll("label").forEach((element) => {
      if (element.id === quizData[currentQuiz].correct + "_text") {
        element.style.color = "green";
        element.style.fontWeight = "bold";
      } else {
        element.style.color = "red";
      }
    });
    console.log("setting it to disabled");
    setTimeout(function () {
      submitBtn.innerText = "Submit";
      submitBtn.style.backgroundColor = "#04adc4";
      document.querySelectorAll("input").forEach((element) => {
        element.removeAttribute("disabled");
        element.style.accentColor = "#232323";
      });
      document.querySelectorAll("label").forEach((element) => {
        element.style.color = "black";
        element.style.fontWeight = "normal";
      });

      currentQuiz++;

      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {

        stop();
        
        quiz.innerHTML = `
            <h2>Du fikk ${score}/${quizData.length} riktige svar!</h2>
            <button onclick="location.reload()">Prøv Igjen</button> 
            <p> Du brukte ${minute} minutter og ${second},${millisecond} sekunder på denne quizen <p>`;
        
      }
    }, 2000);
    console.log(answer, quizData[currentQuiz].correct);
    if (answer === quizData[currentQuiz].correct) {
      submitBtn.innerText = "Riktig :D";
      score++;
      submitBtn.style.backgroundColor = "#44b927";
      audioRiktig.play();
    } else {
      submitBtn.innerText = "Feil :(";
      submitBtn.style.backgroundColor = "#FF0000";
      audioRandom.play();
    }

    console.log("removing the effect disabled");
  }
});




// <------Timer------>//
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;



function start() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
  clearInterval(cron);
}

function reset() {
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}

function timer() {
  if ((millisecond += 10) == 1000) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }

  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`
}

const body = document.querySelector('body');

function myFunction() {
  console.log('Hello, world!');
}

body.onload = start;
