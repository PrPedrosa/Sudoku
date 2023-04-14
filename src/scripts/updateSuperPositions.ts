import { Board } from "../types"

export function updateSuperPositions(board: Board): Board {
	const newBoard: Board = []

	for (let i = 0; i < board.length; i++) {
		if (board[i].value !== 0) {
			newBoard.push({ ...board[i], superPos: null })
			continue
		}

		const rowValues = getRowById(board[i].rowId, board).map(sq => sq.value)
		const colValues = getColById(board[i].colId, board).map(sq => sq.value)
		const boxValues = getBoxById(board[i].boxId, board).map(sq => sq.value)

		const possibleSuperPos = []
		for (let j = 1; j <= 9; j++) {
			if (!rowValues.includes(j) && !colValues.includes(j) && !boxValues.includes(j)) {
				possibleSuperPos.push(j)
			}
		}

		const newSquare = { ...board[i], superPos: possibleSuperPos.length === 0 ? null : possibleSuperPos }
		newBoard.push(newSquare)
	}
	return JSON.parse(JSON.stringify(newBoard))
}

function getRowById(rowId: number, board: Board) {
	return board.filter(sq => sq.rowId === rowId)
}
function getColById(colId: number, board: Board) {
	return board.filter(sq => sq.colId === colId)
}
function getBoxById(boxId: number, board: Board) {
	return board.filter(sq => sq.boxId === boxId)
}
