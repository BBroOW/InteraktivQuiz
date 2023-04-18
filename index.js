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
    correct: "b",
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
const audioFeil = ["Lyd og bilder/aughhhhh-aughhhhh.mp3", "Lyd og bilder/bing-chilling_fcdGgUc.mp3",
"Lyd og bilder/boom.mp3", "Lyd og bilder/clash-royale-hog-rider.mp3", "Lyd og bilder/perfect-fart.mp3", "Lyd og bilder/hei.mp3"];

const random = Math.floor(Math.random() * audioFeil.length);
console.log(random, audioFeil[random]);

let audioRiktig = new Audio('Lyd og bilder/Yippee Original Sound Effect.mp3')
let audioRandom = new Audio(random)

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
  const answer = getSelected();

  //de trykka på submit
  if (answer) {
    //hvis svaret er ingenting
    setTimeout(function () {
      submitBtn.innerText = "Submit";
      submitBtn.style.backgroundColor = "#04adc4"

      currentQuiz++;

      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        quiz.innerHTML = `
            <h2>Du fikk ${score}/${quizData.length} riktige svar!</h2>
    
            <button onclick="location.reload()">Prøv Igjen</button> 
            `;
      }
    }, 2000);

    if (answer === quizData[currentQuiz].correct) {
      submitBtn.innerText = "Riktig :D";
      score++;
      submitBtn.style.backgroundColor = "#44b927"
      audioRiktig.play()
    } else {
      submitBtn.innerText = "Feil :(";
      submitBtn.style.backgroundColor = "#FF0000"
      audioRandom.play()
    }
  }
});
