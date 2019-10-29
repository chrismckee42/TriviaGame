class questionObj {
    constructor(question, a0, a1, a2, a3, correct) {
        this.question = question;
        this.answers = []
        this.answers[0] = a0;
        this.answers[1] = a1;
        this.answers[2] = a2;
        this.answers[3] = a3;
        this.correct = correct
    }
}

const questions = []
const options = ["a", "b", "c", "d"]
var current = 0
var count
var time = 30
var right = 0
var wrong = 0
var inter = false

function generateQuestions() {
    for (let i = 0; i < 10; i++) {
        let a = Math.ceil(Math.random() * 12)
        let b = Math.ceil(Math.random() * 12)
        let c = Math.floor(Math.random() * 4)
        let d = a + b - c
        questions[i] = new questionObj("What is " + a + " + " + b + "?", d, d + 1, d + 2, d + 3, c)
    }

}
generateQuestions()

function loadQuestion(n) {
    const q = questions[n]
    $("#question").empty()
    $("#answers").empty()
    $("#timer").empty()
    $("#question").append($("<h3>").text(q.question))
    q.answers.forEach((a, i) => {
        $("#answers").append($("<div>").text(options[i] + ": " + a).addClass("options").val(i))
    });
    $("#answers").append($("<br>"))
    time = 30
    $("#timer").text(time + " seconds left ")

}

function intermission(rightAnswer, timeout) {
    inter = true
    $("#question").empty()
    $("#answers").empty()
    $("#timer").empty()
    time = 1
    //console.log(questions[current].answers[questions[current].correct])
    if (timeout) {
        $("#question").text("Time is up!")
        $("#answers").text("The correct answer was " + questions[current].answers[questions[current].correct])
    } else if (rightAnswer) {
        $("#question").text("Correct!")
    } else {
        $("#question").text("Incorrect! The correct answer was " + questions[current].answers[questions[current].correct])
    }
    current++

}

function countDown() {
    time--
    //console.log(time, current)
    if (!inter) {
        $("#timer").text(time + " seconds left")
        if (time <= 0) {
            intermission(false, true)
        }
    } else if (time <= 0) {
        if (current === 10) {
            gameEnd()
        } else {
            inter = false
            loadQuestion(current)
            intitalize()
        }
    }
}

function intitalize() {
    $(".options").on("click", function () {

        //console.log($(this).text())
        if (parseInt($(this).val()) === questions[current].correct) {
            // console.log("correct", $(this).val(), questions[current].correct)
            right++
            intermission(true, false)
        } else {
            //console.log("wrong", $(this).val(), questions[current].correct)
            wrong++
            intermission(false, false)
        }
    })
}

function gameEnd() {
    $("#question").empty()
    $("#answers").empty()
    $("#timer").empty()
    $("#question").text("Results")
    $("#answers").append($("<div>").text("Correct: " + right))
    $("#answers").append($("<div>").text("Incorrect: " + wrong))
    $("#timer").text("Click here to play again!")
    clearInterval(count)

    $("#timer").on("click", function () {
        current = 0
        time = 30
        right = 0
        wrong = 0
        inter = false
        generateQuestions()
        loadQuestion(current)
        intitalize()
        count = setInterval(countDown, 1000)
    })
}

loadQuestion(current)


$(document).ready(function () {

    intitalize()

    count = setInterval(countDown, 1000)

})