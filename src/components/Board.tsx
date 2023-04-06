import Square from "./Square"
import { cx } from "../utils"
import { Square as SquareType } from "../types"
import { Board as BoardType } from "../types"
import { useEffect, useState } from "react"

//clicking outside of board unselectes square and/or unselected immeadiatly if value placed
//rubber icon on delete input
export function Board({
	board,
	handleInput,
	initialSquares,
	solve
}: {
	board?: BoardType
	handleInput: (squareId: number, value: number) => void
	initialSquares?: number[]
	solve: () => void
}) {
	if (!board) return null

	const [selectedSquare, setSelectedSquare] = useState<SquareType>()
	//const [selectedInput, setSelectedInput] = useState<number>()
	const inputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	const selectSquare = (sq: SquareType) => {
		if (initialSquares?.includes(sq.id)) return
		if (sq.id === selectedSquare?.id) setSelectedSquare(undefined)
		else setSelectedSquare(sq)
	}

	const selectInput = (value: number) => {
		if (!selectedSquare || initialSquares?.includes(selectedSquare.id)) return
		handleInput(selectedSquare.id, value)
	}

	return (
		<div className='p-[5px] w-[100%] flex flex-col items-center justify-center gap-[15px] relative'>
			<div
				className='debug p-[2px] absolute top-[-50px] right-0'
				onClick={solve}
			>
				solve
			</div>
			<div className='grid grid-cols-9 w-[100%] text-center gap-[5px]'>
				{inputs.map(i => (
					<div
						className={cx(
							"border border-black px-[8px] text-c-purple text-[20px] font-semibold rounded-[5px] bg-c-dark2 shadow-board",
							"active:!bg-c-purple active:!text-black",
							{ "text-red-700": i === 0 }
						)}
						onClick={() => selectInput(i)}
						key={i}
					>
						{i !== 0 ? i : "del"}
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
						/>
					)
				})}
			</div>
		</div>
	)
}
