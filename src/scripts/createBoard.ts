import { updateSuperPositions } from "./updateSuperPositions"
import { Board } from "../types"
import { boardIds, randNum0toNum } from "../utils"
import { solveSudoku } from "./solveSudoku"
import { shuffleArray } from "./shuffleArray"

export const squareValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function createCompleteBoard(givenBoard?: number[]): Board {
  const board = []

  for (let i = 0; i < 81; i++) {
    const id = i + 1
    const rowId = makeRowId(id)
    const colId = makeColId(id)
    const boxId = makeBoxId(rowId, colId)
    if (givenBoard) {
      board.push({
        id: i + 1,
        rowId: rowId,
        colId: colId,
        boxId: boxId,
        superPos: squareValues,
        value: givenBoard[i],
      })
    } else
      board.push({
        id: i + 1,
        rowId: rowId,
        colId: colId,
        boxId: boxId,
        superPos: squareValues,
        value: 0,
      })
  }
  return board
}

const makeRowId = (id: number) => {
  return Math.ceil(id / 9)
}
const makeColId = (id: number) => {
  if (id < 10) return id
  return id % 9 === 0 ? 9 : id % 9
}
const makeBoxId = (rowId: number, colId: number) => {
  if (rowId <= 3) return colId <= 3 ? 1 : colId <= 6 ? 2 : 3
  if (rowId <= 6) return colId <= 3 ? 4 : colId <= 6 ? 5 : 6
  return colId <= 3 ? 7 : colId <= 6 ? 8 : 9
}

export function generateSudoku(difficulty: "easy" | "medium" | "hard"): {
  unsolvedBoard: Board
  solvedBoard: Board
} {
  const numOfZeros =
    difficulty === "easy" ? 40 : difficulty === "medium" ? 45 : 50

  const randIdxStart = Math.floor(Math.random() * 81)

  let board = createCompleteBoard()
  function createValidValue(superPos: number[] | null) {
    return superPos ? superPos[randNum0toNum(superPos.length - 1)] : 0
  }

  board[randIdxStart] = {
    ...board[randIdxStart],
    value: createValidValue(board[randIdxStart].superPos),
  }
  board = updateSuperPositions(board)

  const solvedBoard = solveSudoku(board)
  if (solvedBoard) {
    const squaresToReset: number[] = [...shuffleArray(boardIds)].slice(
      0,
      numOfZeros
    )
    const unsolvedBoard = updateSuperPositions(
      solvedBoard.map((sq) =>
        squaresToReset.includes(sq.id) ? { ...sq, value: 0 } : sq
      )
    )
    return { unsolvedBoard, solvedBoard }

  } else {
    console.log("board generated has no solution, retrying...")
    return generateSudoku(difficulty)
  }
}
