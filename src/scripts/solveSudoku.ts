import { isBoardValid } from "./checkBoard"
import { createCompleteBoard } from "./createBoard"
import { Board } from "../types"
import { updateSuperPositions } from "./updateSuperPositions"

export function solveSudoku(board: Board) {
	let boardBuffer: number[][] = []
	let boardToUse = [...board]
	let iterations = 0

	//Not using while to avoid infinite loops in case a unsolvable board is given
	for (let i = 0; i < 4000; i++) {
		//console.log(boardBuffer)
		//#######console.log("beggining of loop", boardToUse)

		//find square to modify
		let square = boardToUse.find(sq => sq.superPos)
		if (!square) {
			//#############console.log("no square with valid superPos found")
			return boardToUse
		}

		//finding correct square with less super pos
		boardToUse.forEach(sq => {
			if (!square?.superPos) return
			if (!sq.superPos) return
			if (sq.superPos.length < square.superPos.length && sq.superPos.length !== 0) {
				square = sq
			}
		})
		//##############console.log("beggining square", square)

		//modify board and update superPos
		if (square && square.superPos?.length === 1) {
			//#######console.log("super pos is 1", square)
			square = { ...square, value: square.superPos[0] }
			boardToUse = boardToUse.map(sq => {
				if (sq.id !== square?.id) return sq
				return square
			})
			boardToUse = updateSuperPositions(boardToUse)
		}

		if (square && square.superPos && square.superPos.length > 1) {
			//#######console.log("super pos is NOT 1", square)
			const possibleBoardsToChoose = square.superPos.map(sp =>
				updateSuperPositions(
					boardToUse.map(sq => {
						if (sq.id !== square?.id) return sq
						return { ...square, value: sp }
					})
				)
			)
			boardToUse = possibleBoardsToChoose[0]
			const restBoards = possibleBoardsToChoose.filter((b, i) => i !== 0)
			restBoards.forEach(rb => boardBuffer.push(rb.map(sq => sq.value)))
		}

		if (!isBoardValid(boardToUse)) {
			boardToUse = updateSuperPositions(createCompleteBoard(boardBuffer[0]))
			boardBuffer.shift()
			console.log("FUCKUP", boardToUse)
			iterations++
			continue
		}

		const isSolved = isSolution(boardToUse)
		if (isSolved) return boardToUse
		console.log(iterations)
		iterations++
	}
	return boardToUse
}

function isSolution(board: Board) {
	const isBoardNotComplete = board.some(sq => sq.value === 0)
	if (!isBoardNotComplete) {
		console.log("solution", board)
		return true
	}
	return false
}
