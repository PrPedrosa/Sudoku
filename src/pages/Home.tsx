import { useState } from "react"
import { cx } from "../utils"
import InstallPWA from "../components/InstallButton"
import { HiScores } from "../components/HiScores"
import { HowToPlay } from "../components/HowToPlay"
import { DifficultyButton } from "../components/DifficultyButton"

export function Home({
	getBoard,
	animate
}: {
	getBoard: (difficulty: "easy" | "medium" | "hard") => void
	animate: [number, (num: number) => void]
}) {
	const [showInstructions, setShowInstructions] = useState(false)
	const [showHiScores, setShowHiScores] = useState(false)
	const handleShowInstructions = () => {
		setShowInstructions(!showInstructions)
		setShowHiScores(false)
	}
	const handleShowHiScores = () => {
		setShowHiScores(!showHiScores)
		setShowInstructions(false)
	}

	//disabling <Home> animations
	setTimeout(() => {
		animate[1](0)
	}, 2000)

	const difficulties = ["easy", "medium", "hard"] as ["easy", "medium", "hard"]

	return (
		<div className='flex flex-col gap-[30px] items-center relative'>
			<InstallPWA />
			<h1
				className={cx("text-[30px] text-c-purple text-center font-bold", {
					"animate-intro": animate[0]
				})}
			>
				SUDOKU
			</h1>
			<div className='flex gap-[10px] items-center'>
				{difficulties.map((d, i) => (
					<DifficultyButton
						getBoard={getBoard}
						difficulty={d}
						key={i}
						animate={animate[0]}
					/>
				))}
			</div>
			<div className='flex w-full justify-around'>
				<HiScores
					showOrHide={handleShowHiScores}
					show={showHiScores}
					animate={animate[0]}
				/>
				<HowToPlay
					showOrHide={handleShowInstructions}
					show={showInstructions}
					animate={animate[0]}
				/>
			</div>
		</div>
	)
}
