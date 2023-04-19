import { useState } from "react"
import { cx } from "../utils"

export function HowToPlay({
	showOrHide,
	show,
	animate
}: {
	showOrHide: () => void
	show: boolean
	animate: number
}) {
	const [device, setDevice] = useState("desktop")

	return (
		<>
			<button
				className={cx("opts-button", {
					"shadow-none bg-c-purple": show,
					"animate-intro2": animate
				})}
				onClick={showOrHide}
			>
				How to Play
			</button>
			{show && (
				<div className='bg-c-dark2 text-white absolute bottom-[-190px] w-full border-c-purple border rounded-[5px]'>
					<div className='grid grid-rows-[auto_1fr]'>
						<div className='grid grid-cols-2 text-center'>
							<div
								className={cx(
									"rounded-tl-[5px] p-[5px] font-medium text-[18px] text-c-purple cursor-pointer select-none",
									{
										"bg-c-dark3 border-r border-c-purple": device === "desktop"
									},
									{ "border-b border-c-purple": device === "mobile" }
								)}
								onClick={() => setDevice("desktop")}
							>
								PC
							</div>
							<div
								className={cx(
									"rounded-tr-[5px] p-[5px] font-medium text-[18px] text-c-purple cursor-pointer select-none",
									{
										"bg-c-dark3 border-l border-c-purple": device === "mobile"
									},
									{ "border-b border-c-purple": device === "desktop" }
								)}
								onClick={() => setDevice("mobile")}
							>
								Mobile
							</div>
						</div>
						{device === "mobile" && (
							<div className='bg-c-dark3 p-[5px] rounded-b-[5px]'>
								<ul>
									<li className='py-[5px] border-b border-c-purple leading-[120%]'>
										Press a square to select it
									</li>
									<li className='py-[5px] leading-[120%] border-b border-c-purple'>
										Press a number (on top of the board) to write it on the
										square
									</li>
									<li className='py-[5px] leading-[120%]'>
										Long Press a square to write notes
									</li>
								</ul>
							</div>
						)}
						{device === "desktop" && (
							<div className='bg-c-dark3 p-[5px] rounded-b-[5px]'>
								<ul>
									<li className='py-[5px] border-b border-c-purple leading-[120%]'>
										Use Arrow keys or WASD to move around the board
									</li>
									<li className='py-[5px] leading-[120%] border-b border-c-purple'>
										Use number keys to fill the board
									</li>
									<li className='py-[5px] leading-[120%]'>
										Double click to write notes
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}
