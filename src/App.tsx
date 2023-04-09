import { useEffect, useState } from "react"
import { Board } from "./components/Board"
import { generateSudoku } from "./scripts/createBoard"
import { isBoardValid } from "./scripts/checkBoard"
import { isSolution, solveSudoku } from "./scripts/solveSudoku"
import { Square } from "./types"
import { Home } from "./components/Home"
import { updateSuperPositions } from "./scripts/updateSuperPositions"
import { GoBackButton } from "./components/GoBackButton"
import { Timer } from "./components/Timer"
import { CheckSolutionModal } from "./components/CheckSolutionModal"

//maybe do a show error function? if solution is wrong
//maybe do a show/hide all superPositions button?
//maybe do a sudoku rules/instructions?
//DO a show/hide timer and highscores page in localstorage (for all 3 difficulties)
//DO a win animation, checking all squares and painting green if valid

function App() {
	const [board, setBoard] = useState<Square[]>()
	const [initialSquaresIds, setInitialSquareIds] = useState<number[]>()
	const [solvedBoard, setSolvedBoard] = useState<Square[]>()
	const [playing, setPlaying] = useState(false)
	const [timer, setTimer] = useState<number>(0)
	const [intervalId, setIntervalId] = useState<number>()
	const [retry, setRetry] = useState(false)
	const [isValid, setIsValid] = useState(false)
	const [solution, setSolution] = useState(false)
	const [mode, setMode] = useState<"easy" | "medium" | "hard">()

	useEffect(() => {
		if (!board) return
		setIsValid(isBoardValid(board))
	}, [board])

	function handleGetRandomBoard(difficulty: "easy" | "medium" | "hard") {
		if (!difficulty) return
		setMode(difficulty)
		setPlaying(true)

		const { unsolvedBoard, solvedBoard } = generateSudoku(difficulty)
		setBoard(unsolvedBoard)
		setSolvedBoard(solvedBoard)

		const initialSqs = unsolvedBoard
			.filter(sq => sq.value !== 0)
			.map(sq => sq.id)
		setInitialSquareIds(initialSqs)

		setIntervalId(
			setInterval(() => {
				setTimer(prev => prev + 1)
			}, 1000)
		)
	}

	function handleInput(squareId: number, value: number) {
		if (!board) return
		const newBoard = board.map(sq => {
			if (squareId === sq.id) return { ...sq, value: value }
			return sq
		})
		setBoard(updateSuperPositions(newBoard))
	}

	function solve() {
		if (!board) return
		setBoard(solvedBoard)
	}

	const stopTimer = () => {
		clearInterval(intervalId)
		setTimer(0)
		setIntervalId(undefined)
	}

	//this works but wanna do pretty animation to check
	function handleCheckSolution() {
		const oldBoard = board
		if (!board) return
		const newBoard: Square[] = board.map(sq => {
			if (
				!board.find(
					squ =>
						squ.value === sq.value &&
						squ.id !== sq.id &&
						(squ.rowId === sq.rowId ||
							squ.colId === sq.colId ||
							squ.boxId === sq.boxId)
				)
			) {
				return { ...sq, valid: true }
			} else return { ...sq, valid: false }
		})

		if (newBoard.find(sq => sq.valid === false)) {
			setBoard(newBoard)
			setRetry(true)
			setTimeout(() => {
				setBoard(oldBoard)
				setRetry(false)
			}, 1500)
			return
		}
		setBoard(newBoard)
		setRetry(false)
		setSolution(true)
	}

	/* function handleCheckSolution() {
		if (!board) return
		let squareIndex = 0

		const intervalId2 = setInterval(() => {
			if (squareIndex === 30) {
				clearInterval(intervalId2)
				return
			}
			const newBoard = board.map((sq, i) =>
				i === squareIndex ? { ...sq, valid: true } : sq
			)
			setBoard(newBoard)
			squareIndex++
		}, 200)
	} */

	function handleGoBack() {
		setPlaying(false)
		setBoard(undefined)
		setSolvedBoard(undefined)
		setSolution(false)
		setRetry(false)
		stopTimer()
	}

	const isBoardNotCompleted = () => board?.find(sq => sq.value === 0)

	return (
		<div className='h-[100vh] bg-c-dark1 flex w-[100%] items-center justify-center relative'>
			<GoBackButton playing={playing} goBack={handleGoBack} />
			{!playing && <Home getBoard={handleGetRandomBoard} />}
			<Timer time={timer} playing={playing} />

			{playing && (
				<Board
					board={board}
					handleInput={handleInput}
					initialSquares={initialSquaresIds}
					solve={solve}
				/>
			)}
			{playing && !isBoardNotCompleted() && (
				<CheckSolutionModal
					solution={solution}
					retry={retry}
					checkSolution={handleCheckSolution}
					time={timer}
					goBack={handleGoBack}
				/>
			)}
		</div>
	)
}

export default App
