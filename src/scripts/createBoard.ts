import { updateSuperPositions } from "./updateSuperPositions"
import { Board } from "../types"
import { randNum0toNum } from "../utils"

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
				value: givenBoard[i]
			})
		} else
			board.push({
				id: i + 1,
				rowId: rowId,
				colId: colId,
				boxId: boxId,
				superPos: squareValues,
				value: 0
			})
	}
	return board
}

export function generateRandomBoard(difficulty: "easy" | "medium" | "hard"): Board {
	const numOfZeros = difficulty === "easy" ? 40 : difficulty === "medium" ? 50 : 60
	const numOfValues = 81 - numOfZeros

	let zerosBoard = createCompleteBoard()
	function createValidValue(superPos: number[] | null) {
		return superPos ? superPos[randNum0toNum(superPos.length - 1)] : 0
	}

	for (let i = 0; i < numOfValues; i++) {
		const randSquareIdx = Math.floor(Math.random() * 81)
		//pick a rand square, give rand value, update super pos, check board, if not valid,
		zerosBoard[randSquareIdx] = {
			...zerosBoard[randSquareIdx],
			value: createValidValue(zerosBoard[randSquareIdx].superPos)
		}
		zerosBoard = updateSuperPositions(zerosBoard)
	}

	return zerosBoard
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
