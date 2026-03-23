const questions = [
  {q:"What is Python?", options:["Language","Snake","Car","Game"], answer:0},
  {q:"Which keyword defines function?", options:["def","func","define","function"], answer:0},
  {q:"Output of 2+2?", options:["3","4","5","6"], answer:1},
  {q:"List symbol?", options:["[]","{}","()","<>"], answer:0},
  {q:"Dictionary uses?", options:["[]","{}","()","<>"], answer:1},
  {q:"Loop keyword?", options:["for","loop","iterate","repeat"], answer:0},
  {q:"Which is mutable?", options:["tuple","list","string","int"], answer:1},
  {q:"What is lambda?", options:["function","loop","class","object"], answer:0},
  {q:"Index starts from?", options:["0","1","-1","2"], answer:0},
  {q:"Which is OOP concept?", options:["class","loop","if","print"], answer:0}
];

let current = 0;
let score = 0;
let seconds = 0;
let timer;
let username = "";

function startQuiz(){
  username = document.getElementById('username').value.trim();

  if(username === ""){
    alert("Please enter your name");
    return;
  }

  document.getElementById('start-screen').classList.add('hide');
  document.getElementById('quiz-screen').classList.remove('hide');

  timer = setInterval(()=>{
    seconds++;
    document.getElementById('time').innerText = formatTime(seconds);
  },1000);

  loadQuestion();
}

function formatTime(sec){
  let min = Math.floor(sec / 60);
  let remSec = sec % 60;
  return `${String(min).padStart(2,'0')}:${String(remSec).padStart(2,'0')}`;
}

function loadQuestion(){
  const q = questions[current];
  document.getElementById('question').innerText = q.q;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  q.options.forEach((opt,index)=>{
    const btn = document.createElement('div');
    btn.innerText = opt;
    btn.classList.add('option');
    btn.onclick = ()=>selectAnswer(btn,index);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(btn,index){
  const correct = questions[current].answer;
  const options = document.querySelectorAll('.option');

  options.forEach(o=>o.onclick=null);

  if(index === correct){
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    options[correct].classList.add('correct');
  }

  document.getElementById('next-btn').disabled = false;
}

function nextQuestion(){
  current++;
  document.getElementById('next-btn').disabled = true;

  if(current < questions.length){
    loadQuestion();
  } else {
    clearInterval(timer);
    showResult();
  }
}

function showResult(){
  document.getElementById('quiz-screen').classList.add('hide');
  document.getElementById('result-screen').classList.remove('hide');

  let message = "";

  if(score === 10){
    message = `🎉 Congratulations ${username}! Perfect Score!\nScore: ${score}/10\nTime: ${formatTime(seconds)}`;
  } else {
    message = `Good job ${username}!\nScore: ${score}/10\nTime: ${formatTime(seconds)}`;
  }

  document.getElementById('result-text').innerText = message;
}

function restartQuiz(){
  current = 0;
  score = 0;
  seconds = 0;
  username = "";
  clearInterval(timer);

  document.getElementById('username').value = ""; // clear name
  document.getElementById('result-screen').classList.add('hide');
  document.getElementById('start-screen').classList.remove('hide');
  document.getElementById('time').innerText = "00:00";
}
