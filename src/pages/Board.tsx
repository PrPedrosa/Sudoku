import Square from "../components/Square"
import { cx } from "../utils"
import { Square as SquareType } from "../types"
import { Board as BoardType } from "../types"
import { useEffect, useState } from "react"
import { useKeyboardControls } from "../hooks/useKeyboardControls"

export function Board({
	board,
	handleInput,
	initialSquares,
	solve
}: {
	board?: BoardType
	handleInput: (squareId: number, value: number) => void
	initialSquares?: number[]
	solve?: () => void
}) {
	if (!board) return null

	const [selectedSquare, setSelectedSquare] = useState<SquareType>()
	const inputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	const [selectedSquareId, value, setValue] =
		useKeyboardControls(selectedSquare)

	useEffect(() => {
		selectSquare(board[selectedSquareId - 1])
		setSelectedSquare(board[selectedSquareId - 1])
	}, [selectedSquareId])

	useEffect(() => {
		if (value === undefined) return
		selectInput(value)
		setValue(undefined)
	}, [value])

	const selectSquare = (sq: SquareType) => {
		if (sq.id === selectedSquare?.id) setSelectedSquare(undefined)
		else setSelectedSquare(sq)
	}

	const selectInput = (value: number) => {
		if (!selectedSquare || initialSquares?.includes(selectedSquare.id)) return
		handleInput(selectedSquare.id, value)
	}

	const selectedSquareSiblings = board.filter(
		sq =>
			sq.id !== selectedSquare?.id &&
			(sq.boxId === selectedSquare?.boxId ||
				sq.colId === selectedSquare?.colId ||
				sq.rowId === selectedSquare?.rowId)
	)

	return (
		<div className='p-[5px] w-[100%] flex flex-col items-center justify-center gap-[15px] relative'>
			{solve && (
				<div
					className='text-white p-[4px] absolute top-[-50px] right-[50%] translate-x-[50%] bg-c-dark2 border border-c-purple rounded-[5px] shadow-button-purple active:bg-c-purple cursor-pointer'
					onClick={solve}
				>
					Solve!
				</div>
			)}
			<div className='grid grid-cols-10 w-[100%] text-center gap-[5px] sm:w-[450px]'>
				{inputs.map(i => (
					<div
						className={cx(
							"border border-black px-[8px] text-c-purple text-[20px] font-semibold rounded-[5px] bg-c-dark2 shadow-button-purple select-none text-center cursor-pointer",
							"active:bg-c-purple active:text-black",
							{ "text-red-700": i === 0, "active:bg-red-700": i === 0 }
						)}
						onClick={() => selectInput(i)}
						key={i}
					>
						{i !== 0 ? i : "0"}
					</div>
				))}
			</div>
			<div className='grid grid-cols-9 border-[3px] sm:w-[450px] border-black rounded-[5px] shadow-board w-[100%] relative'>
				{board.map(sq => {
					return (
						<Square
							sq={sq}
							key={sq.id}
							select={selectSquare}
							selected={selectedSquare?.id === sq.id}
							isInitial={initialSquares?.includes(sq.id)}
							isSibling={selectedSquareSiblings.includes(sq)}
						/>
					)
				})}
			</div>
		</div>
	)
}
