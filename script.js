const questions = [
    {
        question: "A tuberculose é uma doença infectocontagiosa, milenarmente conhecida, mas ainda considerada um problema de saúde pública a nível mundial. No Brasil, sua notificação compulsória é",
        answers: [
            { text: "Imediata", correct: false},
            { text: "Quinzenal", correct: false},
            { text: "Semanal", correct: true},
            { text: "Mensal", correct: false},
        ]
    },
    {
        question: "A dengue é uma doença infecciosa febril aguda que pode se apresentar de forma benigna ou grave. Por isso, é considerado um sinal de alarme na dengue",
        answers: [
            { text: "Cefaléia intensa", correct: false},
            { text: "Dor retrorbitária.", correct: false},
            { text: "Elevação abrupta de plaquetas", correct: false},
            { text: "Sangramento de mucosas", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;

    nextButton.innerHTML = "Proximo";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Sua pontuação ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();