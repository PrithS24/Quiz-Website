const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box'); 
const tryAgainBtn =  document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () =>{
    popupInfo.classList.add('active');
    main.classList.add('active');
}
exitBtn.onclick = () =>{
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
continueBtn.onclick = () =>{
  quizSection.classList.add('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  quizBox.classList.add('active');

  showQuestions(0);
  qCounter(1);
  headerScore();
}

goHomeBtn.onclick = () =>{
  quizSection.classList.remove('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  quizBox.classList.add('active');

  showQuestions(0);
  qCounter(1);
  headerScore();
}

let qcount = 0;
let qnum = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
  if (qcount < questions.length - 1) {
    qcount++;
    showQuestions(qcount);

    qnum++;
    qCounter(qnum);

    nextBtn.classList.remove('active');
  }
  else {
    console.log('complete');
    showResultBox();
  }
}

tryAgainBtn.onclick = ()=>{
  quizBox.classList.add('active');
  resultBox.classList.remove('active');

  qcount=0;
  qnum=1;
  userScore=0;
  showQuestions(qcount);
  qCounter(qnum);

  headerScore();
}
const optionList = document.querySelector('.option-list');

// getting questions and options from array 
function showQuestions(index) {
  const questiontxt = document.querySelector('.question-text');
  questiontxt.textContent = `${questions[index].num}. ${questions[index].ques}`;

  let optionTag =
   `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>
    <div class="option"><span>${questions[index].options[4]}</span></div>`;

   optionList.innerHTML=optionTag; 

   const option=document.querySelectorAll('.option');
   for(let i=0; i<option.length; i++)
   {
      option[i].setAttribute('onclick', 'optionSelected(this)');
   }
}

function optionSelected(answer){
  let userAnswer = answer.textContent;
  let correctAnswer = questions[qcount].ans;
  let allOptions = optionList.children.length;

  if(userAnswer == correctAnswer)
  {
       
      answer.classList.add('correct');
      userScore+=1;
      headerScore();
  }
  else{
    
    answer.classList.add('incorrect');
  }

//if answer incorrect, auto select correct answer
  for(let i=0; i<allOptions; i++)
  {
      if(optionList.children[i].textContent == correctAnswer)
      {
        optionList.children[i].setAttribute('class', 'option correct');
      }
  }

  //if user has selected , disable other options
  for(let i=0; i<allOptions; i++)
  {
    optionList.children[i].classList.add('disabled');
  }

  nextBtn.classList.add('active');
}

function qCounter(index){
  const qtotal = document.querySelector('.question-total');
  qtotal.textContent=`${index} of ${questions.length} Questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector('.header-score');
  headerScoreText.textContent=`Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove('active');
  resultBox.classList.add('active');

  const scoreText = document.querySelector('.score-text');
  scoreText.textContent=`Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector('.circular-progress');
  const progressValue = document.querySelector('.progress-value');
  let progressStartValue = -1;
  let progressEndValue = (userScore/questions.length)*100;
  let speed =20;

  let progress=setInterval(() =>{
    progressStartValue++;
    progressValue.textContent=`${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#a30e80 ${progressStartValue*3.6}deg, rgba(255,255,255,.1) 0deg)`;
    if(progressStartValue == progressEndValue){
      clearInterval(progress);
    }
  },speed);
}