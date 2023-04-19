import { useEffect, useState } from "react"
import { cx } from "../utils"
import { buildClock } from "./Timer"

export function HiScores({
	showOrHide,
	show,
	animate
}: {
	showOrHide: () => void
	show: boolean
	animate: number
}) {
	const [scores, setScores] = useState<string[]>()
	const [mode, setMode] = useState<string>("easy")
	useEffect(() => {
		setScores(localStorage.getItem(`${mode}-scores`)?.split(","))
	}, [mode])

	return (
		<>
			<button
				className={cx("opts-button", {
					"shadow-none bg-c-purple": show,
					"animate-intro2": animate
				})}
				onClick={() => {
					showOrHide()
					setScores(localStorage.getItem(`${mode}-scores`)?.split(","))
				}}
			>
				HiScores
			</button>
			{show && (
				<div className='bg-c-dark4 text-white absolute bottom-[-180px] w-full border-c-purple border rounded-[5px]'>
					<div className='grid-rows-2'>
						<div className='grid grid-cols-3 text-center leading-[100%] rounded-[5px] cursor-pointer'>
							<div
								onClick={() => setMode("easy")}
								className={cx(
									"rounded-tl-[5px] p-[5px] text-green-700 font-semibold select-none",
									{
										"bg-c-dark2 border-b border-c-purple": mode !== "easy",
										"bg-c-dark4": mode === "easy"
									}
								)}
							>
								Easy
							</div>
							<div
								onClick={() => setMode("medium")}
								className={cx(
									"p-[5px] text-orange-700 font-semibold select-none",
									{
										"bg-c-dark2 border border-c-purple border-t-0":
											mode !== "medium",
										"bg-c-dark4 border-r border-l border-c-purple":
											mode === "medium"
									}
								)}
							>
								Medium
							</div>
							<div
								onClick={() => setMode("hard")}
								className={cx(
									"rounded-tr-[5px] p-[5px] text-red-700 font-semibold select-none",
									{
										"bg-c-dark2 border-b border-c-purple": mode !== "hard",
										"bg-c-dark4": mode === "hard"
									}
								)}
							>
								Hard
							</div>
						</div>
						{scores && (
							<div className='grid grid-row-3 p-[10px]'>
								<div className='grid grid-cols-2 bg-c-dark2 p-[5px]'>
									<div className='text-center'>1.</div>
									<div className='text-left'>
										{+scores[0] !== 0 ? buildClock(+scores[0]) : "-----"}
									</div>
								</div>
								<div className='grid grid-cols-2 p-[5px]'>
									<div className='text-center'>2.</div>
									<div>
										{+scores[1] !== 0 ? buildClock(+scores[1]) : "-----"}
									</div>
								</div>
								<div className='grid grid-cols-2 p-[5px] bg-c-dark2'>
									<div className='text-center'>3.</div>
									<div>
										{+scores[2] !== 0 ? buildClock(+scores[2]) : "-----"}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}
