import { useEffect, useState } from "react"
import { Board } from "./components/Board"
import { generateSudoku } from "./scripts/createBoard"
import { isBoardValid } from "./scripts/checkBoard"
import { isSolution, solveSudoku } from "./scripts/solveSudoku"
import { Square } from "./types"
import { Home } from "./components/Home"

//maybe do a show error function? if solution is wrong
//maybe do a show/hide all superPositions button?
//maybe do a sudoku rules/instructions?
//DO a show/hide timer and highscores page in localstorage (for all 3 difficulties)

function App() {
	const [board, setBoard] = useState<Square[]>()
	const [initialSquaresIds, setInitialSquareIds] = useState<number[]>()
	const [solvedBoard, setSolvedBoard] = useState<Square[]>()
	const [playing, setPlaying] = useState(false)
	const [timer, setTimer] = useState<number>(0)
	const [intervalId, setIntervalId] = useState<number>()
	const [isValid, setIsValid] = useState(false)
	const [solution, setSolution] = useState(false)
	const [mode, setMode] = useState<"easy" | "medium" | "hard">()

	useEffect(() => {
		if (!board) return
		setIsValid(isBoardValid(board))
		setSolution(isSolution(board))
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
		setBoard(newBoard)
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

	return (
		<div className='h-[100vh] bg-c-dark1 flex w-[100%] items-center justify-center relative'>
			{playing && (
				<i
					className='fa-solid fa-arrow-left absolute top-[10px] left-[10px] text-red-800 text-[20px] active:bg-red-800 border border-c-dark4 bg-c-dark3 p-[5px] rounded-[5px] shadow-button-back'
					onClick={() => setTimeout(() => setPlaying(false), 150)}
				/>
			)}
			{!playing && <Home getBoard={handleGetRandomBoard} />}
			{playing && (
				<div className='text-white absolute top-0 left-[100px] debug'>
					{isValid ? "TRUE" : "FALSE"}
				</div>
			)}
			{playing && (
				<div className='text-green-500 absolute top-0 left-[200px] debug'>
					{solution ? "TRUE" : "FALSE"}
				</div>
			)}
			<div className='absolute top-0 left-[300px] text-white debug'>
				{buildTimer(timer)}
			</div>
			<div
				className='absolute top-0 left-[400px] text-white debug'
				onClick={stopTimer}
			>
				stop
			</div>
			{playing && (
				<Board
					board={board}
					handleInput={handleInput}
					initialSquares={initialSquaresIds}
					solve={solve}
				/>
			)}
		</div>
	)
}

//put icon here and set boards to undefined(to reset, more of a safeguard) and maybe popup modal to confirm go back
function goBackButton() {}

function buildTimer(secs: number) {
	//do build secs cuz when secs > 60 and secs%60 < 10 appeards "060"
	const seconds = secs % 60 < 10 ? `0${secs}` : secs % 60
	//do a build minutes function because still need to account for when minutes > 60 ? "00"
	const minutes =
		secs >= 60
			? Math.floor(secs / 60) < 10
				? `0${Math.floor(secs / 60)}`
				: Math.floor(secs / 60)
			: "00"

	const hours = secs >= 3600 ? "01" : "00"
	return `${hours}:${minutes}:${seconds}`
}

export default App
