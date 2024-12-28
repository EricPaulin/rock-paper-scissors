const score = document.querySelector(".score")
const streak = document.querySelector(".streak")
const result = document.querySelector(".result")
const reason = document.querySelector(".reason")

const autoplayBtn = document.querySelector(".autoplayBtn")
const resetBtn = document.querySelector(".resetBtn")
const statsBtn = document.querySelector(".statsBtn")

/*
    Rock Paper Scissors
    Features
        - basic gameplay
            - keyboard support
        - streaks
        - autoplay
        - localStorage 
        - reset
*/

// tracks if Autoplay is ON/OFF
let isAuto = false
let intervalId

// array of moves
let moveset = ["✊", "✋", "✌️"]

/* get/set totalStats */
let totalStats = JSON.parse(localStorage.getItem('totalStats')) || {
    wins: 0, losses: 0, ties: 0, currStreak: 0, highStreak: 0, totalGames: 0, winPercent: 0
}

// testing
console.log(totalStats)


/* Player move */
function playGame(playerMove) {
    // add game to total
    totalStats.totalGames++;

    // generate CPU move
    var computerMove = pickComputerMove()

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

    result.innerText = outcome
    reason.innerText = `Player chose ${toEmoji(playerMove)} and CPU chose ${toEmoji(computerMove)}`

    score.innerText = `PLAYER Score: ${totalStats.wins}
                        CPU Score: ${totalStats.losses}`
    isStreak(outcome)

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

/* Emoji Converter */
function toEmoji(move) {

    if (move == "rock") {
        move = moveset[0]
    }
    else if (move == "paper") {
        move = moveset[1]
    }
    else {
        move = moveset[2]
    }

    return move
}

/* Play Game using Keyboard */
document.body.addEventListener('keydown', (e) => {
    // testing
    //console.log(e.key)

    // check for r, p, or s
    if (e.key === 'r') {
        playGame('rock')
    }
    else if (e.key === 'p') {
        playGame('paper')
    }
    else if (e.key === 's') {
        playGame('scissors')
    }
})

/* Determine Win Streak */
function isStreak(outcome) {
    if (outcome == "WIN") {
        totalStats.currStreak++
        streak.innerText = `WIN STREAK 🔥${totalStats.currStreak}`

        // check if new highest streak
        if (totalStats.currStreak > totalStats.highStreak) {
            totalStats.highStreak = totalStats.currStreak
        }
    }
    if (outcome == "LOSE") {
        totalStats.currStreak = 0
        streak.innerText = ``
    }
}

/* Autoplay Game (CPU vs CPU) */
autoplayBtn.addEventListener("click", () => {

    // start Autoplay
    if(!isAuto) {
        // Runs Every 1 Second, sets Interval Id
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove()
            playGame(playerMove)
        }, 1000)
        isAuto = true;
        autoplayBtn.innerText = 'Autoplay: ON'
    }
    // stop Autoplay
    else {
        clearInterval(intervalId)
        isAuto = false
        autoplayBtn.innerText = 'Autoplay: OFF'

        // reset UI
        setTimeout(() => {
            autoplayBtn.innerText = 'Autoplay 🤖'
        }, 4000)
    }
})

/* Check Total Statistics */
statsBtn.addEventListener("click", () => {

    // calculate Win Percentage
    totalStats.winPercent = totalStats.wins / totalStats.totalGames

    alert(` LIFETIME STATISTICS
        Total Games: ${totalStats.totalGames}
        Games Tied: ${totalStats.ties}
        Win Percentage: ${Math.round(totalStats.winPercent * 100)}%
        Highest Streak: ${totalStats.highStreak}`
    )
})

/* Reset localStorage */
resetBtn.addEventListener("click", () => {
    localStorage.removeItem("totalStats")
    window.location.reload()
})