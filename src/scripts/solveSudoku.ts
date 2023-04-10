import { isBoardValid } from "./checkBoard"
import { createCompleteBoard } from "./createBoard"
import { Board } from "../types"
import { updateSuperPositions } from "./updateSuperPositions"
import { shuffleArray } from "./shuffleArray"

export function solveSudoku(board: Board) {
	let boardBuffer: number[][] = []
	let boardToUse = [...board]
	let iterations = 0

	//Not using while to avoid infinite loops in case a unsolvable board is given
	for (let i = 0; i < 10000; i++) {
		//find square to modify
		let square = boardToUse.find(sq => sq.superPos)
		if (!square) {
			return boardToUse
		}

		//finding correct square with less super pos
		boardToUse.forEach(sq => {
			if (!square?.superPos) return
			if (!sq.superPos) return
			if (
				sq.superPos.length < square.superPos.length &&
				sq.superPos.length !== 0
			) {
				square = sq
			}
		})

		//modify board and update superPos
		if (square && square.superPos?.length === 1) {
			square = { ...square, value: square.superPos[0] }
			boardToUse = boardToUse.map(sq => {
				if (sq.id !== square?.id) return sq
				return square
			})
			boardToUse = updateSuperPositions(boardToUse)
		}

		if (square && square.superPos && square.superPos.length > 1) {
			const possibleBoardsToChoose = square.superPos.map(sp =>
				updateSuperPositions(
					boardToUse.map(sq => {
						if (sq.id !== square?.id) return sq
						return { ...square, value: sp }
					})
				)
			)
			shuffleArray(possibleBoardsToChoose)
			boardToUse = possibleBoardsToChoose[0]
			const restBoards = possibleBoardsToChoose.filter((b, i) => i !== 0)
			restBoards.forEach(rb => boardBuffer.push(rb.map(sq => sq.value)))
		}

		if (
			!isBoardValid(boardToUse) &&
			square &&
			square.superPos &&
			square.superPos.length > 1
		) {
			boardToUse = updateSuperPositions(createCompleteBoard(boardBuffer[0]))
			boardBuffer.shift()
			//console.log(iterations)
			iterations++
			continue
		}

		if (
			!isBoardValid(boardToUse) &&
			square &&
			square.superPos &&
			square.superPos.length === 1
		) {
			if (boardBuffer[0]) {
				boardToUse = updateSuperPositions(createCompleteBoard(boardBuffer[0]))
				boardBuffer.shift()
				//console.log(iterations)
				iterations++
				continue
			} else {
				console.log("board has no solution, dude!!!!")
				return undefined
			}
		}

		const isSolved = isSolution(boardToUse)
		if (isSolved) return boardToUse
		//console.log(iterations)
		iterations++
	}
	return boardToUse
}

export function isSolution(board: Board) {
	const isBoardNotComplete = board.some(sq => sq.value === 0)
	const isValid = isBoardValid(board)
	if (!isBoardNotComplete && isValid) {
		return true
	}
	return false
}
