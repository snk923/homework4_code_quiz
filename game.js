const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const scoreText = document.querySelector('#score');
const timeLeft = document.querySelector("#time-left");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'In what month is Earth closest to the sun?',
        choice1: 'July',
        choice2: 'October',
        choice3: 'January',
        choice4: 'April',
        answer: 3
    },
    {
        question: 'Which nut is used to make dynamite?',
        choice1: 'Almonds',
        choice2: 'Pine nuts',
        choice3: 'Walnuts',
        choice4: 'Peanuts',
        answer: 4
    },
    {
        question: 'What is a group of turkeys called?',
        choice1: 'A clutch',
        choice2: 'A rafter',
        choice3: 'A brood',
        choice4: 'A peep',
        answer: 2
    },
    {
        question: 'What was the first car that was mass-produced?',
        choice1: 'Ford Ram',
        choice2: 'Ford Model-A',
        choice3: 'Ford Model-T',
        choice4: 'Ford Truck',
        answer: 3
    },
    {
        question: 'What is the sum of the angles of a triangle?',
        choice1: '360',
        choice2: '190',
        choice3: '370',
        choice4: '180',
        answer: 4
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;
let countdown = 60;

var startGame = function () {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions],
    getNewQuestion();
}

var countdown = function () {
    var timeLeft = 75;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = "Timer: " + timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to 'Time is up!'
        timerEl.textContent = 'Time is up!';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        }
    }, 1000);

var getNewQuestion = function() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    // question1/5, 2/5, 3/5, etc 
    questionCounter++;

    // Keeps track of what question we are on and provides its text 
    const questionsIndex = Math.floor(Math.random() = availableQuestions.length);
    currentQuestion = availableQuestions [questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(function(choice) {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true;
}

choices.forEach(function(choice) {
    choice.addEventListener('click', function(event) {
        if(!acceptingAnswer) return;
        
        acceptingAnswer = false; 
        const selectedChoice = event.target; 
        const selectedAnswer = selectedChoice.dataset['number']; 

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        } else {
            countDown-=10;
            timeLeft.textContent = 'Timer : ' + countDown;
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions()
        }, 500)
    })
})

incrementScore = function(num) {
    score += num;
    scoreText.innerText = score;
}

countdown(); 
startGame(); 
