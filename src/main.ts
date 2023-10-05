import './style.css'
import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH } from './const'
import { moveDown, moveLeft, moveRight, moveRotate } from './moves'
import { getInitialGame } from './utils'
import { Game } from './types'

/**
 * Get HTML elements
 */
const canvas = document.querySelector('#board')
const next = document.querySelector('#next')
const score = document.querySelector('#score')

/**
 * Validate Canvas elements
 */

if (canvas === null || next === null || score === null) {
  throw new Error('Something is wrong with the tags IDs')
}

const isCanvas = canvas instanceof HTMLCanvasElement && next instanceof HTMLCanvasElement 

if (!isCanvas) {
  throw new Error('Elements are not canvas tags')
}

/**
 * Configure canvas element
 */

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

next.width = BLOCK_SIZE * 4
next.height = BLOCK_SIZE * 4

const context = canvas.getContext('2d')
const nextContext = next.getContext('2d')

if (context === null || nextContext === null) {
  throw new Error('Unable to retrive 2d context from canvas elements')
}

context.scale(BLOCK_SIZE, BLOCK_SIZE)
nextContext.scale(BLOCK_SIZE, BLOCK_SIZE)

/**
 * Global variables
 */
let game = getInitialGame()

let dropCounter = 0
let lastTime = 0

function update (time = 0) {
  draw(game)

  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime
  if (dropCounter > 1000) {
    //piece.position.y++
    game = moveDown(game)
    dropCounter = 0
  }

  window.requestAnimationFrame(update)
}

function draw (game: Game) {
  if (context && canvas) {
    context.fillStyle = '#ccc'
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    game.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          context.fillStyle = 'yellow'
          context.fillRect(x, y, 1, 1)
        }
      })
    })

    game.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          context.fillStyle = 'red'
          context.fillRect(game.piece.position.x + x, game.piece.position.y + y, 1, 1)
        }
      })
    })
    nextContext.fillStyle = '#ccc'
    nextContext.fillRect(0, 0, next.width, next.height)

    game.nextShape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          nextContext.fillStyle = 'red'
          nextContext.fillRect(x, y, 1, 1)
        }
      })
    })

    score.innerHTML = game.score.toString()
  }
}

const HANDLER: Record<string, () => void> = {
  ArrowUp: () => { game = moveRotate(game) },
  ArrowDown: () => { game = moveDown(game) },
  ArrowLeft: () => { game = moveLeft(game) },
  ArrowRight: () => { game = moveRight(game) }
}

window.document.addEventListener('keydown', function (event) {
  const handler = HANDLER[event.key] ?? undefined

  if (handler !== undefined) {
    handler()
  }
})

update(0)
