const scoreView = document.querySelector('.score')
const score = scoreView.children[0]
const bestScore = scoreView.children[1]
const game = document.querySelector('.game')
const player = document.querySelector('.player')
let jump = false
let playerExists = false
const start = scoreView.children[2]
let best = localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0
let atualScore = 0
const cactusSize = ['bigCactus', 'smallCactus', 'mediumCactus']
let isRunning = false

bestScore.innerText = `Best score: ${best}`
score.innerText = `Score: ${atualScore}`

document.body.onkeydown = (e)=>{
    if(e.key != ' ' || jump == true || playerExists == false) return
    jump = true
    player.classList.add('jump')
    setTimeout(()=>{
        player.classList.remove('jump')
        jump = false
    }, 1000)
}

start.onclick =() =>{
    player.classList.remove('hidePlayer')
    playerExists = true
    isRunning = true

    let time = 3000
    let speed = 3000
    genereteCactus(time, speed)
    setInterval(()=>{
        atualScore += 1
        score.innerText = `Score: ${atualScore}`
        if(atualScore > best){
            bestScore.innerText = `Best score: ${atualScore}`
            best = atualScore
            localStorage.setItem('bestScore', best)
        }
        else{
            bestScore.innerText = `Best Score: ${best}`
        }
    }, 100)
}

function genereteCactus(time, speed){
    const div = document.createElement('div')
    const size = getRandomInt(0, 3)

    game.append(div)
    div.classList.add('cactus')
    div.classList.add(cactusSize[size])
    div.style.animation = `cactus ${speed}ms ease-in-out`

    setTimeout(() =>{
        div.remove()
    }, time)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }