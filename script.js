const scoreView = document.querySelector('.score')
const score = scoreView.children[0]
const bestScore = scoreView.children[1]
const game = document.querySelector('.game')
const player = document.querySelector('.player')
let jump = false
let playerExists = false
const start = scoreView.children[2]
let best = localStorage.getItem('bestScore')
    ? localStorage.getItem('bestScore')
    : 0
let atualScore = 0
const cactusSize = ['bigCactus', 'smallCactus', 'mediumCactus']
let isRunning = false
let gameOver = false
let cactusHit = ''
const h2 = document.querySelector('h2')

bestScore.innerText = `Best score: ${best}`
score.innerText = `Score: ${atualScore}`

document.body.onkeydown = (e) => {
    if (e.key != ' ' || jump || playerExists || gameOver) return
    jump = true
    player.classList.add('jump')
    setTimeout(() => {
        player.classList.remove('jump')
        jump = false
    }, 1000)
}

start.onclick = () => {
    if (isRunning || gameOver) return
    player.classList.remove('hidePlayer')
    playerExists = true
    isRunning = true

    let time = 3000
    let speed = 3000
    let generete = setInterval(() => {
        genereteCactus(time, speed)
        if (speed > 1000) speed -= 200
        if (time >= 1000) time -= 200
    }, time)
    let interval = setInterval(() => {
        const playerHit = player.getBoundingClientRect()
        if (document.querySelector('.cactus'))
            cactusHit = document
                .querySelector('.cactus')
                .getBoundingClientRect()
        if (
            cactusHit.left < playerHit.right &&
            cactusHit.right > playerHit.left &&
            playerHit.y == cactusHit.y
        ) {
            clearInterval(interval)
            clearInterval(generete)
            isRunning = false
            h2.innerText = 'Game over\nScore: ' + atualScore
            atualScore = 0
            playerExists = false
            gameOver = true
        }
        if (isRunning == true) {
            atualScore += 1
            score.innerText = `Score: ${atualScore}`
            if (atualScore > best) {
                bestScore.innerText = `Best score: ${atualScore}`
                best = atualScore
                localStorage.setItem('bestScore', best)
            } else {
                bestScore.innerText = `Best Score: ${best}`
            }
        }
    }, 10)
}

function genereteCactus(time, speed) {
    const div = document.createElement('div')
    const size = getRandomInt(0, 3)

    game.append(div)
    div.classList.add('cactus')
    div.classList.add(cactusSize[size])
    div.style.animation = `cactus ${speed}ms ease-in-out`

    cactusHit = document.querySelector('.cactus').getBoundingClientRect()

    setTimeout(() => {
        div.remove()
        cactusHit = ''
    }, speed)
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}
