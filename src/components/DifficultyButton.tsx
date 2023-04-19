import { cx } from "../utils"

export function DifficultyButton({
	getBoard,
	difficulty,
	animate
}: {
	getBoard: (difficulty: "easy" | "medium" | "hard") => void
	difficulty: "easy" | "medium" | "hard"
	animate: number
}) {
	return (
		<div
			className={cx(
				"cursor-pointer border border-black bg-c-purple text-center text-white p-[10px] rounded-[10px] min-w-[80px] font-semibold uppercase text-[14px] select-none active:shadow-none transition duration-500 ease-in-out",
				{
					"hover:bg-green-700 active:bg-green-700 shadow-button-easy":
						difficulty === "easy",
					"hover:bg-orange-600 active:bg-orange-700 shadow-button-medium":
						difficulty === "medium",
					"hover:bg-red-700 active:bg-red-700 shadow-button-hard":
						difficulty === "hard"
				},
				{ "animate-intro2": animate }
			)}
			onClick={() => setTimeout(() => getBoard(difficulty), 150)}
		>
			{difficulty}
		</div>
	)
}
