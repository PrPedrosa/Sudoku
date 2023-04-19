import { useEffect, useState } from "react"
import { cx } from "../utils"
import SVG from "./SVG"

export function GoBackButton({
	playing,
	solverMode,
	goBack
}: {
	playing: boolean
	solverMode: boolean
	goBack: () => void
}) {
	if (!playing && !solverMode) return null
	const [goingBack, setGoingBack] = useState(false)
	useEffect(() => {
		const el = document.getElementById("arrow")
		console.log("el", el)
	}, [])
	return (
		<div
			className={cx(
				"absolute top-[10px] left-[10px] z-10 flex justify-center items-center cursor-pointer",
				"border border-c-dark4 bg-c-dark3 p-[5px] rounded-[5px] shadow-button-back",
				{ "bg-red-700 rounded-full transition ease-in-out 500": goingBack }
			)}
			onClick={() => {
				setGoingBack(true)
				setTimeout(() => {
					setGoingBack(false)
					goBack()
				}, 200)
			}}
		>
			<SVG
				path='arrow'
				fill={goingBack ? "#000000" : "#991b1b"}
				w={20}
				h={20}
			/>
		</div>
	)
}
