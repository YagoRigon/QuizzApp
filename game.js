 const question = document.getElementById('question');
 const choices = Array.from(document.getElementsByClassName('choice-text'));
 const progressText= document.getElementById('progressText');
 const scoreText= document.getElementById('score');
 const progressBarFull= document.getElementById('progressBarFull');
 
 let currentQuestion= {};
 let acceptingAnswers= false;
 let score= 0;
 let questionCounter=0;
 let avaiableQuestions=[];

 let questions = [
     {
         question: "Quanto é 5x3",
         choice1: "10",
         choice2: "18",
         choice3:"25",
         choice4:"15",
         answer: 4
     },

    {
        question: "Quanto é 80/5",
        choice1: "15",
        choice2: "22",
        choice3: "16",
        choice4: "12",
        answer: 3
    },
    {
        question: "Quem foi o Campeão brasileiro de 2019",
        choice1: "Cruzeiro",
        choice2: "Palmeiras",
        choice3: "Flamengo",
        choice4: "Grêmio",
        answer: 3
    }
 ]

 //Constantes

 const CORRECT_BONUS = 10;
 const MAX_QUESTIONS = 3;

 startGame = () => {
     questionCounter = 0;
     avaiableQuestions =[...questions];
     getNewQuestion();
 };
getNewQuestion = () => {
    if(avaiableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS)
     {
         localStorage.setItem('mostRecentScore',score);
         return window.location.assign("/end.html");
     }
    questionCounter ++;
    progressText.innerText = `Question ${questionCounter} /${MAX_QUESTIONS}`;
    //update de progress bar
     progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

const questionIndex = Math.floor(Math.random() * avaiableQuestions.length);
currentQuestion = avaiableQuestions[questionIndex];
question.innerText = currentQuestion.question;


choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
});

avaiableQuestions.splice(questionIndex, 1);


acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return;
    
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply == 'correct'){
            incrementScore(CORRECT_BONUS);
        }
    
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout( () => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    },1000);
    });
});

incrementScore = num =>{
    score+=num;
    scoreText.innerText=score;
}
 startGame();
