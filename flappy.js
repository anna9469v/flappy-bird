let bird = new Image()
bird.src = `img/bird.png`

let back = new Image()
back.src = 'img/back.png'

let pipeBottom = new Image()
pipeBottom.src = 'img/pipeBottom.png'

let pipeUp = new Image()
pipeUp.src = 'img/pipeUp.png'

let road = new Image()
road.src = 'img/road.png'



let fly = new Audio()
fly.src = 'audio/fly.mp3'

let score = new Audio()
score.src = 'audio/score.mp3'

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')


canvas.height = 512
canvas.width = 256

let isPaused = false
let xPos = 10
let yPos = 150
let velY = 0
let gravity = 0.3

let scorePoints = 0
let bestScorePoints = 0

let gap = 100
let pipeX = 260
let pipeBottomY = 180
let pipeUpY = pipeBottomY - gap - 242


function draw() {
    if (isPaused === false) {
        ctx.drawImage(back, 0, 0)
        ctx.drawImage(bird, xPos, yPos)
        velY += gravity
        yPos += velY


        ctx.drawImage(pipeUp, pipeX, pipeUpY)
        ctx.drawImage(pipeBottom, pipeX, pipeBottomY)
        ctx.drawImage(road, 0, 394)

        if (yPos >= 380) {
            reload()

        }

        if (pipeX < -60) {
            pipeX = 260
            pipeBottomY = Math.floor(Math.random() * 350)
            while (pipeBottomY < 150) {
                pipeBottomY = Math.floor(Math.random() * 350)
            }
            pipeUpY = pipeBottomY - gap - 242
        }

        if (xPos + 38 === pipeX && yPos < pipeUpY + 242) {
            reload()
        } else if (xPos + 38 === pipeX && yPos + 26 > pipeBottomY) {
            reload()
        } else if (yPos <= pipeUpY + 242 && yPos >= pipeX + 52) {
            reload()
        }
        if (xPos > pipeX + 52 && xPos < pipeX + 55) {
            score.play()
            scorePoints++
            document.getElementById('scoreText').innerHTML = `SCORE: ${scorePoints}`

        }

        pipeX -= 2
    }

}
setInterval(draw, 20)



document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        moveUp();
    }
})

function moveUp() {
    velY = -5
    fly.play()
}

function reload() {
    if (scorePoints > bestScorePoints) {
        bestScorePoints = scorePoints
    }
    xPos = 10
    yPos = 150
    velY = 0
    scorePoints = 0
    pipeX = 260
    pipeBottomY = 180
    pipeUpY = pipeBottomY - gap - 242

    document.getElementById('scoreText').innerHTML = `SCORE: ${scorePoints}`
    document.getElementById('bestScoreText').innerHTML = `BEST SCORE: ${bestScorePoints}`

}

function pause() {
    isPaused = !isPaused
}