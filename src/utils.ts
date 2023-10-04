import { BOARD_WIDTH } from './const'
import { PIECES } from './pieces'
import { type Board, type Piece, type Game} from './types'

export function createBoard (width: number, height: number): Board {
  const emptyBoard: Board = (Array(height-1).fill(0).map(() => Array(width).fill(0)))

  const lastRow = Array(width).fill(1)
  lastRow[6] = 0
  lastRow[7] = 0
  emptyBoard.push(lastRow)

  return emptyBoard
}

export function checkCollision (board: Board, piece: Piece): boolean {
  return piece.shape.some((row, y) => {
    return row.some((value, x) => {
      const boardValue = board[piece.position.y + y]?.[piece.position.x + x]
      if (boardValue === undefined) {
        return true
      } else if (boardValue === 1 && value === 1) {
        return true
      }
      return false
    })
  })
}

export function removeRows (board: Board): Board {
  const newBoard = structuredClone(board)
  const rowsToRemove: number[] = []

  newBoard.forEach((row, y) => {
    if (row.every(value => value === 1)) {
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach((y) => {
    newBoard.splice(y, 1)
    const newRow = Array(BOARD_WIDTH).fill(0)
    newBoard.unshift(newRow)
  })

  return newBoard
}

export function solidifyPiece (board: Board, piece: Piece): Game {
  const newBoard = structuredClone(board)

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        if (board[y + piece.position.y]?.[x + piece.position.x] !== undefined) {
          newBoard[y + piece.position.y][x + piece.position.x] = 1
        }
      }
    })
  })

  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
  piece.position.x = (BOARD_WIDTH / 2)
  piece.position.y = 0

  if (checkCollision(board, piece)) {
    //solidifyPiece()
    newBoard.forEach(row => row.fill(0))
    window.alert('Ha ha')
  }

  return { board: newBoard, piece: piece }
}