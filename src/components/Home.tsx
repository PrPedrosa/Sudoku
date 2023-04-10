import { useState } from "react"
import { cx } from "../utils"
import InstallPWA from "./Install"

export function Home({
	getBoard
}: {
	getBoard: (difficulty: "easy" | "medium" | "hard") => void
}) {
	const [showInstructions, setShowInstructions] = useState(false)
	const handleShowInstructions = () => setShowInstructions(!showInstructions)
	return (
		<div className='flex flex-col gap-[30px] items-center relative'>
			<div className='text-[30px] text-c-purple text-center font-bold'>
				SUDOKU
			</div>
			<div className='flex gap-[10px]'>
				<DifficultyButton getBoard={getBoard} difficulty='easy' />
				<DifficultyButton getBoard={getBoard} difficulty='medium' />
				<DifficultyButton getBoard={getBoard} difficulty='hard' />
			</div>
			<div className='flex w-full justify-around'>
				<div className='text-center bg-c-dark3 text-white border border-black p-[5px] rounded-[5px] shadow-button-purple select-none active:bg-c-purple'>
					HiScores
				</div>
				<div
					className='text-center bg-c-dark3 text-white border border-black p-[5px] rounded-[5px] shadow-button-purple select-none active:bg-c-purple'
					onClick={handleShowInstructions}
				>
					How to Play
				</div>
			</div>
			<div>
				<InstallPWA />
			</div>
			{showInstructions && (
				<div className='bg-c-dark2 text-white absolute bottom-[-160px] w-full p-[5px] border-c-purple border rounded-[5px]'>
					<ul>
						<li className='py-[5px] border-b border-c-purple'>
							Press on a square to select it
						</li>
						<li className='py-[5px] leading-[120%] border-b border-c-purple'>
							Press on a number to write that value on the selected square
						</li>
						<li className='py-[5px] leading-[120%]'>
							Long Press a square to write small numbers on it
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

function DifficultyButton({
	getBoard,
	difficulty
}: {
	getBoard: (difficulty: "easy" | "medium" | "hard") => void
	difficulty: "easy" | "medium" | "hard"
}) {
	return (
		<div
			className={cx(
				"cursor-pointer border border-black bg-c-purple text-center text-white p-[10px] rounded-[10px] min-w-[80px] font-semibold uppercase text-[14px] select-none",
				{
					"hover:bg-green-700 active:bg-green-700 shadow-button-easy":
						difficulty === "easy",
					"hover:bg-orange-600 active:bg-orange-700 shadow-button-medium":
						difficulty === "medium",
					"hover:bg-red-700 active:bg-red-700 shadow-button-hard":
						difficulty === "hard"
				}
			)}
			onClick={() => setTimeout(() => getBoard(difficulty), 150)}
		>
			{difficulty}
		</div>
	)
}
