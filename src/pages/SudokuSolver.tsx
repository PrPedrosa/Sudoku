import { useState } from "react"
import { createCompleteBoard } from "../scripts/createBoard"
import { Board } from "./Board"
import { updateSuperPositions } from "../scripts/updateSuperPositions"
import { solveSudoku } from "../scripts/solveSudoku"
import { Board as BoardType } from "../types"
import SVG from "../components/SVG"

export function SudokuSolver() {
	const [board, setBoard] = useState(createCompleteBoard())
	const [solvedBoard, setSolvedBoard] = useState<BoardType>()
	const [noSolution, setNoSolution] = useState(false)
	const [loading, setLoading] = useState(false)

	function handleInput(squareId: number, value: number) {
		if (!board) return
		const newBoard = board.map(sq => {
			if (squareId === sq.id) return { ...sq, value: value }
			return sq
		})
		setBoard(updateSuperPositions(newBoard))
	}

	//timeout used to show loading spinner
	function solve() {
		if (!board) return
		setLoading(true)
		setTimeout(() => {
			const solved = solveSudoku(board)
			if (!solved || solved.find(sq => sq.value === 0)) {
				setNoSolution(true)
				setLoading(false)
				return
			}
			setSolvedBoard(solved)
			setLoading(false)
		}, 150)
	}

	return (
		<>
			{!noSolution && (
				<Board
					board={solvedBoard ? solvedBoard : board}
					initialSquares={board.filter(sq => sq.value).map(sq => sq.id)}
					handleInput={handleInput}
					solve={solve}
				/>
			)}
			{loading && (
				<div className='absolute top-[50%] translate-y-[-50%] z-50'>
					<SVG
						path='spinner'
						fill='#ffffff'
						w={60}
						h={60}
						className='animate-spin'
					/>
				</div>
			)}
			{noSolution && (
				<div className='absolute top-[50%] translate-y-[50%] text-white'>
					Board given has no Solution 😔
				</div>
			)}
			<button
				className='absolute text-white bottom-[10%] underline active:text-c-purple select-none'
				onClick={() => {
					setNoSolution(false)
					setBoard(createCompleteBoard())
					setSolvedBoard(undefined)
				}}
			>
				Reset Board
			</button>
		</>
	)
}
