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
var current = 0
var count
var time = 99
for (let i = 0; i < 10; i++) {
    questions[i] = new questionObj("Q" + (i + 1), "A" + (i + 1), "B" + (i + 1), "C" + (i + 1), "D" + (i + 1), 0)

}

function loadQuestion(n) {
    const q = questions[n]
    $("#question").empty()
    $("#answers").empty()
    $("#timer").empty()
    $("#question").append($("<h3>").text(q.question))
    q.answers.forEach((a, i) => {
        $("#answers").append($("<div>").text(a).addClass("options").attr("value"))
    });
    $("#timer").text(time + " seconds left " + q.correct)

}

function countDown() {
    time--
    $("#timer").text(time + " seconds left")
    if (time <= 0) {
        // time is up
    }
}

loadQuestion(current)


$(document).ready(function () {


    $(".options").on("click", function () {

        console.log($(this).text())
        if ($(this).text() === questions[current].correct) {
            console.log("correct", $(this).text(), questions[current].correct)
        } else {
            console.log("wrong", $(this).text(), questions[current].answers[questions[current].correct])
        }

    })

    count = setInterval(countDown, 1000)

})