import './style.css'
import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH } from './const'
import { moveDown, moveLeft, moveRight, moveRotate } from './moves'
import { createBoard } from './utils'

const canvas = document.querySelector('canvas')

const context = canvas?.getContext('2d')

if (canvas !== null) {
  canvas.width = BLOCK_SIZE * BOARD_WIDTH
  canvas.height = BLOCK_SIZE * BOARD_HEIGHT
}

if (context !== null && context !== undefined) {
  context.scale(BLOCK_SIZE, BLOCK_SIZE)
}

let board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)

let piece = {
  position: { x: 5, y: 7 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

let dropCounter = 0
let lastTime = 0

function update (time = 0) {
  draw()

  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime
  if (dropCounter > 1000 ) {
    //piece.position.y++
    const ret = moveDown(board, piece)
    piece = ret.piece
    board = ret.board
    dropCounter = 0
  }

  window.requestAnimationFrame(update)
}

function draw () {
  if (context && canvas) {
    context.fillStyle = '#ccc'
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          context.fillStyle = 'yellow'
          context.fillRect(x, y, 1, 1)
        }
      })
    })
    
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value === 1) {
          context.fillStyle = 'red'
          context.fillRect(piece.position.x + x, piece.position.y + y, 1, 1)
          
        }
      })
    })
  }
}


window.document.addEventListener('keydown', function(event) {
  console.log(event)
  if (event.key === 'ArrowLeft') {
    const newPiece = moveLeft(board, piece)
    piece.position = newPiece.position
    piece.shape = newPiece.shape
  }
  if (event.key === 'ArrowRight') {
    const newPiece = moveRight(board, piece)
    piece.position = newPiece.position
    piece.shape = newPiece.shape
  }
  if (event.key === 'ArrowDown') {
    const ret = moveDown(board, piece)
    board = ret.board
    piece = ret.piece
  }

  if (event.key === 'ArrowUp') {
    moveRotate(board, piece)
  }
})

update()
