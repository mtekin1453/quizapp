let questions = [
    {
        question: "Wer hat HTML erfunden?",
        answer_1: "Robbie Williams",
        answer_2: "Lady Gaga",
        answer_3: "Tim Berners-Lee",
        answer_4: "Justin Bieber",
        right_answer: 3,
    },
    {
        question: "Wie bindet man eine Website in eine Website?",
        answer_1: "Antwort1",
        answer_2: "Antwort2",
        answer_3: "Antwort3",
        answer_4: "Antwort4545",
        right_answer: 2,
    },
    {
        question: "Wer ist am 21.09.1990 geboren?",
        answer_1: "Robbie Williams",
        answer_2: "Lady Gaga",
        answer_3: "Mehmet Tekin",
        answer_4: "Justin Bieber",
        right_answer: 3,
    },
    {
        question: "Wer ist der beste Fußballer der Welt?",
        answer_1: "Robbie Williams",
        answer_2: "Christiano Ronaldo",
        answer_3: "Mehmet Tekin",
        answer_4: "Justin Bieber",
        right_answer: 2,
    },
];
let nummer = 0;
let richtig = 0;

let AUDIO_SUCCES = new Audio('sounds/success.mp3');
let AUDIO_FAIL = new Audio('sounds/wrong.mp3');
let AUDIO_FINISH = new Audio('sounds/finish.mp3')

function start() {
    document.getElementById('questions-qunatity').innerHTML = questions.length;
    document.getElementById('question-number').innerHTML = nummer + 1;
    aktuelleFrage(nummer);

}

function aktuelleFrage(nummer) {

    if (nummer >= questions.length) {
        showEndScreen();
    }
    else {
        updateProgressBar();
        showQuestion();
    }
}

function showEndScreen() {
    nummer = 0;
    document.getElementById('question').parentNode.style = 'display: none';
    document.getElementById('finish').style = '';
    document.getElementById('gesamtquestion').innerHTML = questions.length;
    document.getElementById('richtig').innerHTML = richtig;
    document.getElementById('quizzImage').src = "img/trophy-gc4e46cbd6_640.png"
    AUDIO_FINISH.play();
}

function nachsteFrage() {
    nummer++;
    aktuelleFrage(nummer);
    document.getElementById('question-number').innerHTML = nummer + 1;

    resetButtons();
    document.getElementById('buttonNext').disabled = true;

}

function updateProgressBar() {
    let prozent = (nummer + 1) / questions.length;
    prozent = prozent * 100;
    console.log('Prozent: ', prozent)
    document.getElementById('progressbar2').innerHTML = `${prozent} %`;
    document.getElementById('progressbar2').style = `width: ${prozent}%`;
}

function showQuestion() {
    let frage = questions[nummer];
    document.getElementById('question').innerHTML = frage.question;
    document.getElementById('antwort1').innerHTML = frage.answer_1;
    document.getElementById('antwort2').innerHTML = frage.answer_2;
    document.getElementById('antwort3').innerHTML = frage.answer_3;
    document.getElementById('antwort4').innerHTML = frage.answer_4;
}

function answer(antwort) {
    let frage = questions[nummer];

    let letzteBuchstabe = antwort.slice(-1);

    if (letzteBuchstabe == frage['right_answer']) {
        AUDIO_SUCCES.play();
        document.getElementById(`antwort${frage['right_answer']}`).classList.add('card-bodyR');
        document.getElementById('buttonNext').disabled = false;
        richtig++;
    }
    else {
        AUDIO_FAIL.play();
        document.getElementById(`antwort${letzteBuchstabe}`).classList.add('card-bodyF');
        document.getElementById(`antwort${frage['right_answer']}`).classList.add('card-bodyR');
        document.getElementById('buttonNext').disabled = false;
    }
}

function resetButtons() {
    document.getElementById('antwort1').classList.remove("card-bodyF", "card-bodyR");
    document.getElementById('antwort2').classList.remove("card-bodyF", "card-bodyR");
    document.getElementById('antwort3').classList.remove("card-bodyF", "card-bodyR");
    document.getElementById('antwort4').classList.remove("card-bodyF", "card-bodyR");
}

function startAgain() {
    document.getElementById('question').parentNode.style = '';
    document.getElementById('finish').style = 'display:none';
    nummer = 0;
    richtig = 0;
    document.getElementById('quizzImage').src = "img/quiz-g0c16ec56e_1280.png"
    start();
}