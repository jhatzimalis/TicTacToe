var startbutton = document.getElementById("startbutton");
var p1NameBox = document.getElementById("p1name");
var p2NameBox = document.getElementById("p2name");
var warning = document.getElementById("warning");
var game = document.querySelector("#game");
var cells = document.querySelectorAll(".cell");
var turnName = document.getElementById("turnName");
var commentBox = document.getElementById("comments");
var turn = 0;

const winningCombinations = [
    [1, 2, 3],[4, 5, 6],[7, 8, 9],
    [1, 4, 7],[2, 5, 8],[3, 6, 9],
    [1, 5, 9],[3, 5, 7]
  ];

var player1 = {
    symbol: "X",
    name: p1NameBox.value,
    clicked: []
    // score: 0
};

var player2 = {
    symbol: "O",
    name: p2NameBox.value,
    clicked: []
};

// function commentStructure(dateTime, ) {

// }

function checkUsers() {
    // update player names from input boxes
    player1.name = p1NameBox.value;
    player2.name = p2NameBox.value;
    // if any player name length = 0 show warning, else start game
    if (player1.name.length == 0 || player2.name.length == 0) {
        // warning message
        warning.classList.remove("toggle") // ensure warning is shown if game previsouly run
        game.classList.add("toggle") // ensure game area hidden if game previously run
    } else {
        // start game
        warning.classList.add("toggle"); // hide warning
        game.classList.remove("toggle"); // show game area
        startGame();
    }
}

function startGame() {

    player1.clicked = player2.clicked = []; // reset player selected list
    turn = 0; // reset turns
    turnName.textContent = player1.name; // player 1 always starts

    // clean board
    // loop through all cells
    for (var i = 0; i < cells.length; i++) {
        // set pointers
        cells[i].textContent = i + 1;
        // clean board 
        cells[i].classList.remove("cellClicked");
        cells[i].classList.remove("cellWinner");
        // create button
        cells[i].onclick = cellSelected;
    }
    // clean commentary
    commentBox.textContent = "";
}

function checkBoard() {
    // check board function

    if (turn >= 9) {
        comments.textContent = "TIE";
    }

    // check player selection with winning combinations
    for (var o = 0; o < winningCombinations.length; o++) {
        var q = winningCombinations[o][0];
        var w = winningCombinations[o][1];
        var e = winningCombinations[o][2];

        // var combo = winningCombinations[o];
        // comments.textContent += combo;
        // var q = combo[0];
        // var w = combo[1];
        // var e = combo[2];

        // for (var f = 0; f < 2; f++) {
        //     if (player[f].clicked.includes(q) && player[f].clicked.includes(w) && player[f].clicked.includes(e)) {
        //         comments.textContent = "Player1 WINS";
        //     }
        // }

        

        if (player1.clicked.includes(q) && player1.clicked.includes(w) && player1.clicked.includes(e)) {
            commentBox.textContent = "Player1 WINS";
            cells[q-1].classList.add("cellWinner");
            cells[w-1].classList.add("cellWinner");
            cells[e-1].classList.add("cellWinner");

        } else if (player2.clicked.includes(q) && player2.clicked.includes(w) && player2.clicked.includes(e)) {
            commentBox.textContent = "Player2 WINS";
            cells[q-1].classList.add("cellWinner");
            cells[w-1].classList.add("cellWinner");
            cells[e-1].classList.add("cellWinner");
            // cells.onclick = null;
        }
    }
}


// var selection = null;

function cellSelected() {
    // function called if cell is clicked

    // save selected cell
    // selection = this.textContent;

    // disable button if pressed
    this.onclick = null;


    // get cell number add to score


    // next turn

    // if true p1 turn, else p2 turn
    if (turn % 2 == 0) {
        // update turn name
        turnName.textContent = player2.name;
        // record player choice
        player1.clicked += this.textContent;
        // write symbol to cell
        this.textContent = player1.symbol;
    } else {
        turnName.textContent = player1.name;
        player2.clicked += this.textContent;
        this.textContent = player2.symbol;
    }
    turn ++;

    // update clicked cell
    this.classList.add("cellClicked");
    
    // commentary box constructor
    // comments.textContent += "CLICK " + this.textContent +turn + player1.clicked;

    checkBoard();
}

        

startbutton.onclick = checkUsers;



