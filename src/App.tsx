import classNames from "classnames"
import { useEffect, useState } from "react"
import { isBoardValid } from "./scripts/checkBoard"
import { validBoard } from "./utils"
import { createCompleteBoard, generateRandomBoard } from "./scripts/createBoard"
import { solveSudoku } from "./scripts/solveSudoku"
import { updateSuperPositions } from "./scripts/updateSuperPositions"
import { Square } from "./types"

function App() {
	const [board, setBoard] = useState(updateSuperPositions(createCompleteBoard(validBoard)))
	const [nextSquareToWrite, setNextSquareToWrite] = useState(board.find(sq => sq.superPos))
	const [superPositions, setSuperPositions] = useState(
		board.map(sq => {
			return { id: sq.id, superPos: sq.superPos }
		})
	)

	const [isValid, setIsValid] = useState(false)
	const cx = classNames

	useEffect(() => {
		if (!board) return
		setIsValid(isBoardValid(board))
		squareToWrite()
		getSuperPositions()
	}, [board])

	function handleGetRandomBoard() {
		const newboard = generateRandomBoard("easy")
		updateSuperPositions(newboard)
		setBoard(newboard)
	}

	function squareToWrite() {
		let square = board.find(sq => sq.superPos)
		board.forEach(sq => {
			if (!square?.superPos) return
			if (!sq.superPos) return
			if (sq.superPos.length < square.superPos.length) {
				square = sq
			}
		})
		setNextSquareToWrite(square)
	}

	function getSuperPositions() {
		const sp = board.map(sq => {
			return { id: sq.id, superPos: sq.superPos }
		})
		setSuperPositions(sp)
	}

	function handleClickSquare(square: Square) {
		let newSquare: Square
		if (!nextSquareToWrite) return
		if (square.id !== nextSquareToWrite.id) return
		if (!square.superPos) return
		newSquare = { ...square, value: square.superPos[0] }
		const newboard = board.map(sq => {
			if (sq.id !== nextSquareToWrite.id) return sq
			return newSquare
		})
		setBoard(updateSuperPositions(newboard))
	}

	function solve() {
		setBoard(solveSudoku(board))
	}

	return (
		<div className='bg-slate-500 h-[100vh] p-[100px]'>
			<div className='cursor-pointer border border-black bg-white p-[10px]' onClick={handleGetRandomBoard}>
				Random
			</div>
			<div className='cursor-pointer border border-black bg-green-600 p-[10px]' onClick={solve}>
				solve
			</div>
			<div>{isValid ? "TRUE" : "FALSE"}</div>
			<div className='grid grid-cols-9 w-[450px] border-2 border-black'>
				{board &&
					board.map(sq => {
						return (
							<div
								key={sq.id}
								className={cx("border-2 border-red-500 h-[50px] bg-white flex items-center justify-center relative cursor-pointer", {
									"!border-r-black": sq.id % 3 === 0,
									"!border-l-black": sq.id % 3 === 1,
									"!border-b-black": borderBottomBlackIds.includes(sq.id),
									"!border-t-black": borderTopBlackIds.includes(sq.id)
									/* "!bg-green-600": nextSquareToWrite?.id === sq.id */
								})}
								onClick={() => handleClickSquare(sq)}
							>
								<div className={cx({ hidden: sq.value === 0 })}>{sq.value}</div>
								{/* <div className='grid grid-cols-3 gap-[2px]'>
									{sq.superPos && superPositions[sq.id - 1].superPos?.map(sp => <div className='text-[12px] text-blue-700'>|{sp}|</div>)}
								</div> */}
								<div className='text-[8px] absolute top-0 left-0'>{sq.id}</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

const borderBottomBlackIds = [19, 20, 21, 22, 23, 24, 25, 26, 27, 46, 47, 48, 49, 50, 51, 52, 53, 54, 73, 74, 75, 76, 77, 78, 79, 80, 81]
const borderTopBlackIds = [28, 29, 30, 31, 32, 33, 34, 35, 36, 55, 56, 57, 58, 59, 60, 61, 62, 63, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export default App
