import { update as updateSnake, draw as drwaSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js"
import { update as updateFood, draw as drwaFood } from "./food.js"
import { outsideGrid } from './grid.js'


let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if (gameOver) {
        if (confirm('you lose and for restart press ok')) {
            window.location = './snakeGame.html'
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsinceLastRender < 1 / SNAKE_SPEED) return


    lastRenderTime = currentTime
    update()
    draw()
}
window.requestAnimationFrame(main)


function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drwaSnake(gameBoard)
    drwaFood(gameBoard)

}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}