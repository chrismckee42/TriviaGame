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
for (let i = 0; i < 10; i++) {
    questions[i] = new questionObj("Q" + (i + 1), "A" + (i + 1), "B" + (i + 1), "C" + (i + 1), "D" + (i + 1), 0)

}

function loadQuestion(n) {
    const q = questions[n]
    $("#question").empty()
    $("#answers").empty()
    $("#timer").empty()
    $("#question").append($("<h3>").text(q.question))
    q.answers.forEach(a => {
        $("#answers").append($("<h5>").text(a).addClass("options"))
    });
    $("#timer").append($("<div>").text("Times Up " + q.correct))

}

loadQuestion(0)

$(document).ready()

$(document).ready(function () {


    $(".options").on("click", function () {

        console.log($(this).text())

    })
})