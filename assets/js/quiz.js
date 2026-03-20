/* ============================= */
/* QUIZ ENGINE (ISOLATED CLEAN) */
/* ============================= */

const questions = [
{
question: "In a leadership meeting, when challenged, you:",
answers: [
{ text: "I think maybe we can try this...", score:1, explanation:"Hesitation weakens authority. Você está inseguro — falta posicionamento." },
{ text: "I believe this could work based on our data.", score:2, explanation:"Better. Mas ainda falta firmeza estratégica." },
{ text: "I recommend we move forward with this approach. The data supports it.", score:3, explanation:"Strong. You pinpoint direction and lead the room." }
]
},
{
question: "When presenting performance:",
answers: [
{ text:"We have good numbers.", score:1, explanation:"Muito vago. Isso não comunica impacto." },
{ text:"We are improving this quarter.", score:2, explanation:"Claro, mas ainda genérico." },
{ text:"The data shows a strong upward trend. We are surging in Q3.", score:3, explanation:"Excelente. Data + interpretação = influência." }
]
},
{
question: "During a difficult discussion:",
answers: [
{ text:"I’m not sure…", score:1, explanation:"Você perde controle da conversa." },
{ text:"Let’s think about it.", score:2, explanation:"Neutro. Mas não lidera decisão." },
{ text:"Let’s run a test before making a final decision.", score:3, explanation:"Perfeito. Você estrutura a incerteza." }
]
},
{
question: "After a meeting:",
answers: [
{ text:"Thanks everyone.", score:1, explanation:"Zero liderança." },
{ text:"Let’s follow up.", score:2, explanation:"Genérico. Falta direção." },
{ text:"Let’s schedule a check-in to track progress.", score:3, explanation:"Forte. Você cria execução." }
]
}
];

let currentQuestion = 0;
let totalScore = 0;

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  if(!document.getElementById("questionText")) return;

  loadQuestion();

  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
});

/* LOAD QUESTION */
function loadQuestion(){

  const q = questions[currentQuestion];

  document.getElementById("questionText").innerText = q.question;

  const answersBox = document.getElementById("answers");
  answersBox.innerHTML = "";

  q.answers.forEach(answer => {

    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = answer.text;

    btn.onclick = () => selectAnswer(answer);

    answersBox.appendChild(btn);
  });

  updateProgress();
}

/* SELECT ANSWER */
function selectAnswer(answer){

  totalScore += answer.score;

  const box = document.getElementById("explanationBox");

  box.innerHTML = `
    <p><strong>Insight:</strong></p>
    <p>${answer.explanation}</p>
    <p>👉 Improve how you structure ideas and lead conversations.</p>
  `;

  box.classList.remove("hidden");
  document.getElementById("nextBtn").classList.remove("hidden");
}

/* NEXT */
function nextQuestion(){

  currentQuestion++;

  document.getElementById("explanationBox").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");

  if(currentQuestion < questions.length){
    loadQuestion();
  } else {
    showResult();
  }
}

/* PROGRESS */
function updateProgress(){
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const bar = document.getElementById("progressFill");
  if(bar) bar.style.width = progress + "%";
}

/* RESULT */
function showResult(){

  const result = getResult(totalScore);

  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("resultTitle").innerText = result.level;

  document.getElementById("resultDescription").innerHTML = `
    You are at <strong>${result.level}</strong> level.<br><br>
    👉 This is not about English.<br>
    👉 This is about influence and decision-making.<br><br>

    Português:<br>
    Você precisa parar de traduzir e começar a se posicionar estrategicamente.
  `;

  document.getElementById("whatsappBtn").onclick = () => {
    sendToWhatsApp(result.message);
  };
}

/* RESULT LOGIC */
function getResult(score){

  if(score <=5){
    return {
      level:"Beginner",
      message:"I completed the diagnostic and got Beginner level."
    };
  }
  else if(score <=8){
    return {
      level:"Operational",
      message:"I completed the diagnostic and got Operational level."
    };
  }
  else{
    return {
      level:"Strategic",
      message:"I completed the diagnostic and got Strategic level."
    };
  }
}