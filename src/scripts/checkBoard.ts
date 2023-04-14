import { Board } from "../types"

const numOfRows = 9
const numOfCols = 9
const numOfBoxes = 9

export function isBoardValid(board: Board) {
  if (
    board.some(
      (sq) => (!sq.superPos || sq.superPos.length === 0) && sq.value === 0
    )
  )
    return false
  return (
    checkIncompleteRows(board) &&
    checkIncompleteCols(board) &&
    checkIncompleteBoxes(board)
  )
}

function checkIncompleteRows(board: Board) {
  let result = true
  for (let i = 1; i <= numOfRows; i++) {
    const row = board.filter((sq) => sq.rowId === i)
    const rowValues = row.filter((sq) => sq.value !== 0).map((sq) => sq.value)
    const set = new Set()
    rowValues.forEach((val) => set.add(val))
    if (set.size !== rowValues.length) result = false
  }
  return result
}

function checkIncompleteCols(board: Board) {
  let result = true
  for (let i = 1; i <= numOfCols; i++) {
    const col = board.filter((sq) => sq.colId === i)
    const colValues = col.filter((sq) => sq.value !== 0).map((sq) => sq.value)
    const set = new Set()
    colValues.forEach((val) => set.add(val))
    if (set.size !== colValues.length) result = false
  }
  return result
}

function checkIncompleteBoxes(board: Board) {
  let result = true
  for (let i = 1; i <= numOfBoxes; i++) {
    const box = board.filter((sq) => sq.boxId === i)
    const boxValues = box.filter((sq) => sq.value !== 0).map((sq) => sq.value)
    const set = new Set()
    boxValues.forEach((val) => set.add(val))
    if (set.size !== boxValues.length) result = false
  }
  return result
}
