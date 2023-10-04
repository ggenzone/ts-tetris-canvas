
export interface Game {
  board: Board
  piece: Piece
}
export type Board = number[][]
export interface Position {
  x: number
  y: number
}

export interface Piece {
  position: Position
  shape: number[][]
}
