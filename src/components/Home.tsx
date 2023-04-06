import { cx } from "../utils"

export function Home({
	getBoard
}: {
	getBoard: (difficulty: "easy" | "medium" | "hard") => void
}) {
	return (
		<div className='flex flex-col gap-[30px]'>
			<div className='text-[30px] text-c-purple text-center font-bold'>
				SUDOKU
			</div>
			<div className='flex gap-[10px]'>
				<DifficultyButton getBoard={getBoard} difficulty='easy' />
				<DifficultyButton getBoard={getBoard} difficulty='medium' />
				<DifficultyButton getBoard={getBoard} difficulty='hard' />
			</div>
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
