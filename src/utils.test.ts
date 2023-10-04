import { expect, it } from 'vitest'
import { checkCollision, createBoard } from './utils'

it('test createBoard', () => {
  const board = createBoard(10, 10)
  expect(board[0][0]).toBe(0)
  expect(board[9][9]).toBe(1)
  expect(board[10]?.[10]).toBe(undefined)
})

it('test checkCollision', () => {
  const board = createBoard(10, 10)
  const piece = {
    position: { x: 8, y: 8 },
    shape: [
      [1, 1],
      [1, 1]
    ]
  }
  const ret1 = checkCollision(board, piece)
  expect(ret1).toBe(true)

  piece.position.x = 5
  piece.position.y = -1
  const ret2 = checkCollision(board, piece)
  expect(ret2).toBe(true)

  piece.position.x = 5
  piece.position.y = 5
  const ret3 = checkCollision(board, piece)
  expect(ret3).toBe(false)
})
