const score = document.querySelector(".score")
const streak = document.querySelector(".streak")
const result = document.querySelector(".result")
const reason = document.querySelector(".reason")

const resetBtn = document.querySelector(".resetBtn")
const statsBtn = document.querySelector(".statsBtn")

/*
    Rock Paper Scissors
    Features
        - basic gameplay
        - streaks
        - localStorage 
        - reset
*/ 

/* get/set totalStats */
let totalStats = JSON.parse(localStorage.getItem('totalStats')) ||  { 
    wins: 0, losses: 0, ties: 0, currStreak: 0, highStreak: 0, totalGames: 0, winPercent: 0
}

console.log(totalStats)


/* Player move */
function playGame(playerMove) {
    // add game to total
    totalStats.totalGames++;

    // generate CPU move
    var computerMove = pickComputerMove();

    var outcome = ""

    /* Gameplay */
        // ROCK
    if (playerMove == "rock") {
        if (computerMove == "rock") {
            outcome = "DRAW"
            totalStats.ties++
        }
        else if (computerMove == "paper") {
            outcome = "LOSE"
            totalStats.losses++
        }
        else {
            outcome = "WIN"
            totalStats.wins++;
        }
    }
        // PAPER
    else if (playerMove == "paper") {
        if (computerMove == "rock") {
            outcome = "WIN"
            totalStats.wins++
        }
        else if (computerMove == "paper") {
            outcome = "DRAW"
            totalStats.ties++
        }
        else {
            outcome = "LOSE"
            totalStats.losses++
        }
    }
        // SCISSORS
    else {
        if (computerMove == "rock") {
            outcome = "LOSE"
            totalStats.losses++
        }
        else if (computerMove == "paper") {
            outcome = "WIN"
            totalStats.wins++
        }
        else {
            outcome = "DRAW"
            totalStats.ties++
        }
    }

    /* Setting Stats + Text */
    // save totalStats to local storage
        // must first convert to JSON (can only accept string)
    localStorage.setItem('totalStats', JSON.stringify(totalStats))
    
    score.innerText =   `Player Score: ${totalStats.wins}
                        Computer Score: ${totalStats.losses}`
    isStreak(outcome)
    result.innerText = outcome
    reason.innerText = `Player chose ${playerMove} and CPU chose ${computerMove}.`
}

/* CPU move */
function pickComputerMove() {
    // generate random number 0 - 2
    var genChoice = Math.floor(Math.random() * 3)

    if (genChoice == 2) {
        move = "rock"
    }
    else if (genChoice == 1) {
        move = "paper"
    }
    else {
        move = "scissors"
    }

    return move
}

/* Determine Win Streak */
function isStreak(outcome) {
    if (outcome == "WIN") {
        totalStats.currStreak++
        streak.innerText = `WIN STREAK 🔥${totalStats.currStreak}`

        // check if new highest streak
        if (totalStats.currStreak > totalStats.highStreak) {
            totalStats.highStreak = totalStats.currStreak;
        }
    }
    if (outcome == "LOSE") {
        totalStats.currStreak = 0
        streak.innerText = ``
    }
}

/* Check Total Statistics */
statsBtn.addEventListener("click", function() {

    // calculate Win Percentage
    totalStats.winPercent = totalStats.wins / totalStats.totalGames

    alert(` LIFETIME STATISTICS
        Total Games: ${totalStats.totalGames}
        Games Tied: ${totalStats.ties}
        Win Percentage: ${Math.round(totalStats.winPercent * 100)}%
        Highest Streak: ${totalStats.highStreak}`
    );
})

/* Reset localStorage */
resetBtn.addEventListener("click", function() {
    localStorage.removeItem("totalStats")
    window.location.reload();
})