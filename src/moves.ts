import { type Piece, type Board } from './types'
import { checkCollision, removeRows, solidifyPiece } from "./utils"

export function moveDown (board: Board, piece: Piece): { board: Board, piece: Piece } {
  let tempPiece = structuredClone(piece)
  let newBoard = structuredClone(board)
  tempPiece.position.y++

  if (!checkCollision(board, tempPiece)) {
    piece.position = tempPiece.position
  } else {
    const ret = solidifyPiece(newBoard, piece)
    newBoard = ret.board
    tempPiece = ret.piece
    newBoard = removeRows(newBoard)
  }

  return {
    board: newBoard,
    piece: tempPiece
  }
}

export function moveLeft (board: Board, piece: Piece): Piece {
  const tempPiece = structuredClone(piece)
  tempPiece.position.x--

  if (!checkCollision(board, tempPiece)) {
    piece.position = tempPiece.position
  }

  return piece
}

export function moveRight (board: Board, piece: Piece): Piece {
  const tempPiece = structuredClone(piece)
  tempPiece.position.x++

  if (!checkCollision(board, tempPiece)) {
    piece.position = tempPiece.position
  }

  return piece
}

export function moveRotate (board: Board, piece: Piece): Piece {
  const tempPiece = structuredClone(piece)

  const newShape = []
  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = []
    for (let j = piece.shape.length - 1; j >= 0; j--) {
      //row[i] = board[j][i]
      row.push(piece.shape[j][i])
    }

    newShape.push(row)
  }
  tempPiece.shape = newShape

  if (!checkCollision(board, tempPiece)) {
    piece.shape = tempPiece.shape
  }

  return tempPiece
}